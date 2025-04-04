import Button from "../Button";
import "./musicCard.css";

export default function MusicCard({ playButton, playlistImg, playlistName }) {
  return (
    <div className="music-card-container">
      <div>
        <img className="playlist-img" src={playlistImg} alt="Playlist Image" />
      </div>
      <div>
        <h4>{playlistName}</h4>
        <Button className={"play-music-btn"}>{playButton}</Button>
      </div>
    </div>
  );
}
