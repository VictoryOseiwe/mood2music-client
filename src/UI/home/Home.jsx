import "./Home.css";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import MoodPic from "../../assets/mood2.png";
import Button from "../../component/Button";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";
import { useEffect, useRef } from "react";

export default function Home() {
  const navigate = useNavigate();
  const element = useRef(null);

  const toSignUpPage = () => {
    navigate("/signup");
  };

  const toSignInPage = () => {
    navigate("/signin");
  };

  useEffect(() => {
    const typed = new Typed(element.current, {
      strings: ["mood2music"],
      typeSpeed: 60,
      loop: false,
      backSpeed: 30,
      showCursor: false,
      startDelay: 1000,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      {/* Navbar component is imported from component/navbar/Navbar.js */}
      <div className="hero-section">
        <p className="hero-start-text">... Start your day with a smile</p>
        <img className="hero-img" src={MoodPic} alt="Smiling Mood" />{" "}
        {/* Displaying an image */}
        <h1 ref={element} className="hero-text">
          {/* mood2music */}
        </h1>
        <p className="hero-description">
          ... discover music tailored with your mood today
        </p>
        <div className="hero-btn-container">
          <Button onClick={toSignUpPage} className={"signup-btn"}>
            Sign Up
          </Button>
          <Button onClick={toSignInPage} className={"signin-btn"}>
            Sign In
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  ); // End of return statement
}
