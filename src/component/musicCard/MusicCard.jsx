import Button from "../Button";
import "./musicCard.css";

export default function musicCard({ playButton, playlistImg, playButton }) {
  return (
    <div className="music-card-container">
      <h4>{playlistName}</h4>
      <img src={playlistImg} alt="Playlist Image" />
      <Button>{playButton}</Button>
    </div>
  );
}
