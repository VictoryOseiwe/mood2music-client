import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { Spinner } from "../component/Spinner/Spinner";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />; // Prevents flickering

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
