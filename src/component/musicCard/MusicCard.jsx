import Button from "../Button";

export default function musicCard({ playButton, playlistImg, playButton }) {
  return (
    <div>
      <h4>{playlistName}</h4>
      <img src={playlistImg} alt="Playlist Image" />
      <Button>{playButton}</Button>
    </div>
  );
}
