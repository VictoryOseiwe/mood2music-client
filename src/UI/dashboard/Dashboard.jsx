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
      const token = localStorage.getItem("user");
      console.log(token);

      if (!token) {
        toast.error("Not authorized. Please sign in");
        navigate("/signin");
        return;
      }
      if (!mood) {
        toast.error("Please enter your mood");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/mood/addmood",
        { mood },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data?.message);
      setPlaylist(response.data.playlist);
      setMood("");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Cannot post mood");
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
          <div>{playlist}</div>
        </div>
      </div>
    </>
  );
}
