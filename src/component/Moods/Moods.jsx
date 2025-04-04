import { useEffect, useState } from "react";
import "./Moods.css";
import axios from "axios";
import toast from "react-hot-toast";
export default function Moods() {
  const [moods, setMoods] = useState();

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await axios.get("http://localhost:3000/mood/getmood", {
          withCredentials: true,
        });
        setMoods(response.data.moods);
      } catch (error) {
        toast.error("Unable to get moods");
      }
    };

    fetchMoods();
  }, []);
  return (
    moods && (
      <div>
        <h4>All Moods</h4>
        {moods.map((mood, index) => (
          <li key={index}>{mood.mood}</li>
        ))}
      </div>
    )
  );
}
