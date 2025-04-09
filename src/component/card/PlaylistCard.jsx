import { useEffect, useState } from "react";
import "./PlaylistCard.css";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../Button";
export default function PlaylistCard() {
  const [playlists, setPlaylists] = useState();
  const [playlist, setPlaylist] = useState();

  const getPlaylist = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/playlist/recommendedplaylist",
        {
          withCredentials: true,
        }
      );
      // const addedPlaylist = setPlaylist(response.data?.playlist);
      // setPlaylists((prevPlaylists) => {
      //   const updated = [addedPlaylist, ...prevPlaylists];
      //   return updated.slice(0, 10);
      // });
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
      setPlaylists(response.data.allPlaylists.slice(0, 10));
      toast.success("Playlist fetched");
    } catch (error) {}
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
            <div>
              <h4>{playlist.name}</h4>
              <img src={playlist.image} alt="playlist image" />
              <a href={playlist.url}>Play Now</a>
            </div>
          )}
        </div>
        <div>
          {playlists?.map((p, i) => (
            <div key={i}>
              <h4>{p.name}</h4>
              <img src={p.image} alt="playlist image" />
              <a href={p.url}>Play Now</a>
              <p>{p.playlistMood}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
