import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { Spinner } from "../component/Spinner/Spinner";
import "./Protected.css";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading)
    // The css might not be needed though 
    return (
      <div className="spin-container">
        <Spinner />
      </div>
    ); // Prevents flickering

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
