import "./Auth.css";
import MoodPic from "../../assets/mood2.png";
import Button from "../../component/Button";
import Input from "../../component/input/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../utils/AuthContext";
import Navbar from "../../component/navbar/Navbar";
import Footer from "../../component/footer/Footer";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // ✅ Function to handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        formData,
        { withCredentials: true }
      );

      setFormData({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
      });

      login(response.data.user);
      toast.success(response.data.message || "Registration successful.");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setError(
        error.response.data.message + ", Refresh page to try again" ||
          "Registration failed. Refresh page to try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <Navbar />
      <div className="auth-container">
        <div className="form-div">
          <form onSubmit={handleSubmit} className="form-container">
            <h3>Create an Account</h3>
            <div className="name-container">
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                Label={"First Name"}
                type="text"
                htmlFor={"firstName"}
                disabled={isLoading}
                required
              />
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                Label={"Last Name"}
                type="text"
                htmlFor={"lastName"}
                disabled={isLoading}
                required
              />
            </div>
            <Input
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              Label={"Username"}
              type="text"
              htmlFor={"userName"}
              disabled={isLoading}
              required
            />
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
              Label={"Email"}
              type="email"
              htmlFor={"email"}
              disabled={isLoading}
              required
            />
            <Input
              name="password"
              value={formData.password}
              onChange={handleChange}
              Label={"Password"}
              type="password"
              htmlFor={"password"}
              disabled={isLoading}
              required
            />
            <Button type="submit" disabled={isLoading} className={"auth-btn"}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
            <div>
              <p className="p-tag-sign-in">
                Already have an account?{" "}
                <span onClick={() => navigate("/signin")}>Sign In</span>
              </p>
            </div>
          </form>
        </div>
        <div className="img-div">
          <img className="smiling-img" src={MoodPic} alt="smiling sticker" />
          <h2 className="logo-text">mood2music</h2>
          {error && <p className="error-msg">{error}</p>}
        </div>
      </div>
      <Footer />
    </section>
  );
}
