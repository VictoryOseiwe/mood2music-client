import Home from "./UI/home/Home";
import About from "./UI/about/About";
import Contact from "./UI/contact/Contact";
import SignUp from "./UI/Auth/SignUP";
import SignIn from "./UI/Auth/SignIn";
import NotFoundPage from "./UI/notfoundpage/Notfound";
import Dashboard from "./UI/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            {/* authenticated route */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            {/* catch-all route */}
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}
