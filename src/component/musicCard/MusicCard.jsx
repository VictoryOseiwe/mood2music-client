import Button from "../Button";
import "./musicCard.css";

export default function MusicCard({
  playButton,
  playlistImg,
  playlistName,
  playlistUrl,
}) {
  return (
    <div className="music-card-container">
      <div>
        <img className="playlist-img" src={playlistImg} alt="Playlist Image" />
      </div>
      <div className="music-title-and-playbtn">
        <h4 className="playlist-name">{playlistName}</h4>
        <Button className={"play-music-btn"}>
          <a href={playlistUrl}>{playButton}</a>
        </Button>
        <a href={playlistUrl} className="play-music-btn">
          <Button>{playButton}</Button>
        </a>
      </div>
    </div>
  );
}
