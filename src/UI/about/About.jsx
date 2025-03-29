import NavBar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import "./About.css";
export default function About() {
  return (
    <div className="about-container">
      <NavBar />
      <div className="about-inner-container">
        <h1 className="about-head-text">About m2m</h1>
        <div className="about-m2m-text-container">
          <p className="typing-effect about-m2m-text ">
            This is a simple about page.
          </p>
        </div>
        <Footer />
      </div>
    </div>
  );
}
