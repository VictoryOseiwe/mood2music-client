import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import { useAuth } from "../../utils/AuthContext";
import "./Dashboard.css";
import { Avatar } from "../../component/Icons";
import Input from "../../component/input/Input";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Dashboard() {
  const [mood, setMood] = useState("");
  const [playlist, setPlaylist] = useState();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!mood) {
        toast.error("Please enter your mood");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/mood/addmood",
        { mood },
        {
          withCredentials: true,
        }
      );

      toast.success(response.data?.message);
      setMood("");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Cannot post mood");
    }
  };

  const handlePlaylist = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/playlist/recommendedplaylist",
        { withCredentials: true }
      );

      toast.success("Playlist generated successfully");
      setPlaylist(response.data.playlist);
    } catch (error) {
      console.error("Error generating playlist");
      toast.error(error?.response?.data?.error || "Cannot generate playlist");
    }
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="top-container">
          <div>
            <Avatar size={50} />
            <Button onClick={handleLogOut}>Sign Out</Button>
          </div>
          <div>
            <h1>Welcome, User!</h1>
            <p>This is your dashboard.</p>
          </div>
        </div>
        <div>
          {/* Add your dashboard content here */}
          <form onSubmit={handleSubmit}>
            <Input
              name="mood"
              value={mood}
              Label={"How are you feeling?"}
              htmlFor={"mood"}
              type="text"
              placeholder="Enter mood..."
              onChange={(e) => setMood(e.target.value)}
            />
            <Button type="submit">Submit Mood</Button>
          </form>
          <h2>Your Mood Playlist</h2>
          <Button onClick={handlePlaylist}>Get PlayList</Button>
          {playlist && (
            <div>
              <h4>{playlist.name}</h4>
              <img src={playlist.image} alt="playlist image" />
              <Button>
                <a href={playlist.url}>Play Now</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
