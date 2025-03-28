import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { user } = useAuth();

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/signin" />;
}
