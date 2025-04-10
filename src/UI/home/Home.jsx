import "./Home.css";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import MoodPic from "../../assets/mood2.png";
import Button from "../../component/Button";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import StepProgress from "../../component/StepProgress/StepProgress";
import CookieBanner from "../../component/cookie";

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
      <section className="hero-section">
        <p className="hero-start-text">... Start your day with a smile</p>
        <img className="hero-img" src={MoodPic} alt="Smiling Mood" />{" "}
        <h1 ref={element} className="hero-text"></h1>
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
      </section>
      <CookieBanner />
      <section className="how-it-works-section">
        <div className="hit-first-div">
          <Button className={"hit-fd-btn"}>How it works</Button>
          <div className="hit-text-container">
            <h2 className="hit-head-text">How mood2music Works</h2>
            <p className="hit-p-text">
              mood2music analyzes your emotional state, and provides you with
              personalized music recommendations.
            </p>
          </div>
        </div>
        <div className="hit-second-div">
          <StepProgress />
        </div>
      </section>
      <Footer />
    </div>
  ); // End of return statement
}
