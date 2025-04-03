import Button from "../Button";
import "./musicCard.css";

export default function musicCard({ playButton, playlistImg, playButton }) {
  return (
    <div className="music-card-container">
      <h4>{playlistName}</h4>
      <img className="playlist-img" src={playlistImg} alt="Playlist Image" />
      <Button className={"play-music-btn"}>{playButton}</Button>
    </div>
  );
}
