import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./Playlists.css";

export default function PlayLists({}) {
  const [playlists, setPlaylists] = useState();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/playlist/getplaylist",
          {
            withCredentials: true,
          }
        );
        setPlaylists(response.data.allPlaylists);
      } catch (error) {
        toast.error("Error fetching playlists");
      }
    };
    fetchPlaylists();
  }, []);
  return (
    playlists && (
      <div>
        <h4>All playlist</h4>
        {playlists.map((playlist, index) => (
          <div key={index}>
            <h2>{playlist.name}</h2>
            <p>{playlist.playlistMood}</p>
            <a href={playlist.url}>Playlist LInk</a>
            <img
              src={playlist.image}
              alt="playlist image"
              className="playlist-img"
            />
          </div>
        ))}
      </div>
    )
  );
}
