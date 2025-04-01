import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import { useAuth } from "../../utils/AuthContext";
import "./Dashboard.css";
import { Avatar } from "../../component/Icons";
import Input from "../../component/input/Input";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function Dashboard() {
  const [mood, setMood] = useState("");
  const [playlist, setPlaylist] = useState();
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
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

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/userName",
          {
            withCredentials: true,
          }
        );

        setUserName(response.data.userName);
        setGreeting(generateGreeting());
      } catch (error) {
        console.error(error);
        toast.error("couldn't fetch user's name");
      }
    };

    fetchUserName();
  }, []);

  const generateGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <>
      <div className="dashboard-section">
        <div className="dashboard-container">
          <div className="top-container">
            <div>
              <Avatar size={50} />
              <Button onClick={handleLogOut}>Sign Out</Button>
            </div>
            {/* <div> */}
            <div className="greetings-container">
              <h1 className="username">Hello, {userName}</h1>
              <p className="greeting">{greeting}</p>
            </div>
            {/* </div> */}
          </div>
          <div>
            {/* Add your dashboard content here */}
            <form className="mood-submission" onSubmit={handleSubmit}>
              <Input
                name="mood"
                className={"mood-input"}
                value={mood}
                Label={"How are you feeling?"}
                htmlFor={"mood"}
                type="text"
                placeholder="Enter mood..."
                onChange={(e) => setMood(e.target.value)}
              />
              <Button className={"submit-mood-btn"} type="submit">
                Submit Mood
              </Button>
            </form>
            <h2>Your Mood Playlist</h2>
            <Button className={"get-playlist-btn"} onClick={handlePlaylist}>
              Get PlayList
            </Button>
            {playlist && (
              <div>
                <h4>{playlist.name}</h4>
                <img src={playlist.image} alt="playlist image" />
                <a href={playlist.url}>
                  <Button className={"playmusic-btn"}>Play Now</Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
