import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";
import "./Contact.css";
import Input from "../../component/input/Input";
import Button from "../../component/Button";
export default function Contact() {
  return (
    <div className="contact-container">
      <Navbar />
      <div className="inner-class-container">
        <h1 className="contact-head-text">Contact</h1>
        <form>
          <Input type="text" htmlFor={"fullName"} Label="Full Name Here" />
          <Input type="email" htmlFor={"email"} Label="Your Email" />
          <Input type="text" htmlFor={"subject"} Label="Subject" />
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Your Message"
            className="msg-box"
          />
          <Button className={"auth-btn"} type="submit">
            Send
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
