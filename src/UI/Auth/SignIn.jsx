import "./Auth.css";
import MoodPic from "../../assets/mood2.png";
import Button from "../../component/Button";
import Input from "../../component/input/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
        "http://localhost:3000/user/login",
        formData,
        { withCredentials: true }
      );

      setFormData({
        email: "",
        password: "",
      });

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3000/user/register",
  //       formData,
  //       { withCredentials: true }
  //     );

  //     console.log("Registration Response:", response);

  //     if (response.data?.success) {
  //       toast.success(response.data.message || "Registration successful.");
  //       localStorage.setItem("user", JSON.stringify(response.data.user));
  //       // ✅ Clear the form after successful registration
  //       setFormData({
  //         firstName: "",
  //         lastName: "",
  //         username: "",
  //         email: "",
  //         password: "",
  //       });

  //       navigate("/dashboard");
  //       navigate("/dashboard");
  //     } else {
  //       const errorMessage = response.data.message || "Registration failed.";
  //       setError(errorMessage);
  //       toast.error(errorMessage);
  //     }
  //   } catch (error) {
  //     console.error("Registration error", error);
  //     const errorMessage =
  //       axios.isAxiosError(error) && error.response?.data?.message
  //         ? error.response.data.message
  //         : "Error occurred during registration";

  //     setError(errorMessage);
  //     toast.error(errorMessage);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <section className="auth-section">
      <div className="auth-container">
        <div className="form-div">
          <form onSubmit={handleSubmit} className="form-container">
            <h3>Create an Account</h3>
            {/* <div className="name-container">
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
              name="username"
              value={formData.username}
              onChange={handleChange}
              Label={"Username"}
              type="text"
              htmlFor={"username"}
              disabled={isLoading}
              required
            /> */}
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
              {isLoading ? "Logging User In..." : "Sign In"}
            </Button>
            <div>
              <p className="p-tag-sign-in">
                Don't have an account?{" "}
                <span onClick={() => navigate("/signup")}>Sign Up</span>
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
    </section>
  );
}
