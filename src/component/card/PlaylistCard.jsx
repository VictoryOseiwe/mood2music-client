import { useEffect, useState } from "react";
import "./Card.css";
import axios from "axios";
export default function PlaylistCard() {
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
      } catch (error) {}
    };
    fetchPlaylists();
  }, []);
  return (
    <div>
      <h1>Card for both music and playlist</h1>
      {playlists &&
        playlists.map((playlist) => (
          <div className="card" key={playlist._id}>
            <img src={playlist.image} alt={playlist.name} />
            <h2>{playlist.name}</h2>
            <p>{playlist.description}</p>
          </div>
        ))}
    </div>
  );
}
