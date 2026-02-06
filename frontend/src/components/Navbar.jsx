import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <span>Rialsysteme</span>
      <span>{user?.name}</span>
      <button onClick={handleLogout}>Salir</button>
    </nav>
  );
}
