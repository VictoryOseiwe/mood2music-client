import { useEffect, useState } from "react";
import "./MoodCard.css";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../input/Input";
import Button from "../Button";
export default function MoodCard() {
  const [moods, setMoods] = useState([]);
  const [mood, setMood] = useState("");

  const fetchMoods = async () => {
    if (mood.length === 0) {
      toast.success("No moods found for this user");
    } else {
      try {
        const response = await axios.get("http://localhost:3000/mood/getmood", {
          withCredentials: true,
        });
        setMoods(response.data.moods.slice(0, 10));
      } catch (error) {
        toast.error("Unable to get moods");
      }
    }
  };

  const handleAddedMood = async (e) => {
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

      const addedMood = response.data.mood;

      setMoods((prevMoods) => {
        const updated = [addedMood, ...prevMoods];
        return updated.slice(0, 10);
      });

      toast.success(response.data?.message);
      setMood("");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.error || "Cannot post mood");
    }
  };

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const bgColors = [
    "var(--purple)",
    "var(--yellow)",
    "var(--green)",
    "var(--blue)",
    "var(--red)",
  ];

  // Displaying the last 10 moods in the top-right corner
  return (
    <div className="mood-container">
      <h4>All Moods</h4>

      <div className="mood-input-container">
        <Input
          type="text"
          value={mood}
          placeholder="How are you feeling today!!!"
          onChange={handleMoodChange}
          name="mood"
          className={"mood-input"}
        />
        <Button className={"mood-input-btn"} onClick={handleAddedMood}>
          Add Mood
        </Button>
      </div>

      <div className="scroll-container">
        <div className="scroll-row">
          {moods?.map((mood, index) => (
            <div
              className="mood-box"
              key={index}
              style={{ backgroundColor: bgColors[index % bgColors.length] }}
            >
              {mood.mood}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
