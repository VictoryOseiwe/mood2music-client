import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>; // Prevents flickering

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
