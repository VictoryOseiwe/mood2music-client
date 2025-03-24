import { useNavigate } from "react-router-dom";
import MoodPic from "../../assets/mood2.png";
import Button from "../../component/Button";
import "./Notfound.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const backHome = () => {
    navigate("/");
  };

  // Render the 404 page with a smiling face, a message, and a button to go back to the home page.
  return (
    <>
      <div className="notfound-container">
        <img className="notfound-img" src={MoodPic} alt="smiling face" />
        <h1 className="notfound-title">404 - Page Not Found</h1>
        <p className="notfound-ptag">
          Phew!!! The page you're looking for doesn't exist.
        </p>
        <Button className={"notfound-btn"} onClick={backHome}>
          Go Back
        </Button>
      </div>
    </>
  );
}
