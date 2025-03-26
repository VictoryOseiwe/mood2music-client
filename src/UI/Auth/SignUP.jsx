import "./Auth.css";
import MoodPic from "../../assets/mood2.png";
import Button from "../../component/Button";
export default function SignUp() {
  return (
    <section className="auth-container">
      <div className="form-div">
        <form action="POST" className="form-container">
          <h3>Create an Account</h3>
          <Button>Sign Up</Button>
        </form>
      </div>
      <div>
        <img className="smiling-img" src={MoodPic} alt="smiling sticker" />
        <h2 className="logo-text">mood2music</h2>
      </div>
    </section>
  );
}
