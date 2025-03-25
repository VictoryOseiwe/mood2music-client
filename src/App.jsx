import Home from "./UI/home/Home";
import About from "./UI/about/About";
import Contact from "./UI/contact/Contact";
import SignUp from "./UI/Auth/SignUP";
import SignIn from "./UI/Auth/SignIn";
import NotFoundPage from "./UI/notfoundpage/Notfound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<NotFoundPage />} /> {/* catch-all route */}
        </Routes>
      </Router>
    </>
  );
}
