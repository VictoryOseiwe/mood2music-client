import { useEffect, useState } from "react";
import "./MoodCard.css";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../input/Input";
import Button from "../Button";
export default function MoodCard() {
  const [moods, setMoods] = useState();
  const [mood, setMood] = useState("");

  const fetchMoods = async () => {
    try {
      const response = await axios.get("http://localhost:3000/mood/getmood", {
        withCredentials: true,
      });
      setMoods(response.data.moods.slice(0, 10));
    } catch (error) {
      toast.error("Unable to get moods");
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

  // Displaying the last 10 moods in the top-right corner
  return (
    <div>
      <h4>All Moods</h4>

      <div className="mood-input">
        <Input
          type="text"
          value={mood}
          placeholder="How are you feeling today!!!"
          onChange={handleMoodChange}
          name="mood"
        />
        <Button onClick={handleAddedMood}>Add Mood</Button>
      </div>

      <div className="scroll-container">
        <div className="scroll-row">
          {moods?.map((mood, index) => (
            <div className="mood-box" key={index}>
              {mood.mood}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
