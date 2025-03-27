import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import { useAuth } from "../../utils/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
        <p>
          Here you can manage your tasks, view your progress, and track your
          performance.
        </p>
        <p>Please log in to access your dashboard.</p>
        <Button onClick={handleLogOut}>Sign Out</Button>
      </div>
    </>
  );
}
