import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import { useAuth } from "../../utils/AuthContext";
import "./Dashboard.css";
import { Avatar } from "../../component/Icons";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import MoodCard from "../../component/Moods/MoodCard";
import PlaylistCard from "../../component/card/PlaylistCard";

export default function Dashboard() {
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
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
          <MoodCard />
          <PlaylistCard />
        </div>
        <p>courtesy @victory oseiwe</p>
      </div>
    </>
  );
}
