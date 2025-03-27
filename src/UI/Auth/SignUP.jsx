import "./Auth.css";
import MoodPic from "../../assets/mood2.png";
import Button from "../../component/Button";
import Input from "../../component/input/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        {
          username,
          password,
          email,
          firstName,
          lastName,
        },
        { withCredentials: true }
      );

      if (response?.data?.success) {
        toast.success(response.data.message || "Registration successful.");
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Registration failed.");
        toast.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Registration error", error);
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data?.message
          ? error.response.data.message
          : "Error occurred during registration";

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <div className="form-div">
          <form onSubmit={handleSubmit} className="form-container">
            <h3>Create an Account</h3>
            <div className="name-container">
              {" "}
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                Label={"First Name"}
                type="text"
                htmlFor={"firstName"}
                disabled={isLoading}
              />
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                Label={"Last Name"}
                type="text"
                htmlFor={"lastName"}
                disabled={isLoading}
              />
            </div>
            <Input
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              Label={"Username"}
              htmlFor={"username"}
              type="text"
              disabled={isLoading}
            />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              Label={"Email"}
              type="email"
              htmlFor={"email"}
              disabled={isLoading}
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              Label={"Password"}
              type="password"
              htmlFor={"password"}
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} className={"auth-btn"}>
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
            <div>
              {error && <p className="error-msg">{error}</p>}
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
        </div>
      </div>
    </section>
  );
}
