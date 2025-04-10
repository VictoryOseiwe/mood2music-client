import { useEffect, useState } from "react";
import "./PlaylistCard.css";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../Button";
export default function PlaylistCard() {
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useState();

  const getPlaylist = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/playlist/recommendedplaylist",
        {
          withCredentials: true,
        }
      );
      setPlaylist(response.data.playlist);
      toast.success("Playlist generated successfully.");
    } catch (error) {
      toast.error("Error getting playlist");
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/playlist/getplaylist",
        {
          withCredentials: true,
        }
      );
      setPlaylists(response.data.allPlaylists);
      toast.success("Playlist fetched");
    } catch (error) {
      toast.error("Couldn't fetch playlists from DB");
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <div>
      <h1>Card for both music and playlist</h1>
      <div>
        <div>
          <Button onClick={getPlaylist}>Get Playlist</Button>
          {playlist && (
            <div className="playlist-container">
              <img
                className="playlist-image"
                src={playlist.image}
                alt="playlist image"
              />
              <h4 className="playlist-name">{playlist.name}</h4>

              <a className={"playlist-button"} href={playlist.url}>
                Play Now
              </a>
            </div>
          )}
        </div>
        <div className="playlists-container">
          {playlists?.length > 0 ? (
            playlists.map((p, i) => (
              <div key={i} className="playlist-container">
                <h4 className="playlist-name">{p.name}</h4>
                <img className="playlist-image" src={p.image} alt="playlist" />
                <a className="playlist-button" href={p.url}>
                  Play Now
                </a>
                <p>mood: {p.playlistMood}</p>
              </div>
            ))
          ) : (
            <p>No playlists found</p>
          )}
        </div>
      </div>
    </div>
  );
}
