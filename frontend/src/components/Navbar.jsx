import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout, user } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <span>Rialsysteme</span>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button onClick={toggleTheme}>
          {dark ? "☀️ Claro" : "🌙 Oscuro"}
        </button>

        <span>{user?.name}</span>

        <button onClick={handleLogout}>Salir</button>
      </div>
    </nav>
  );
}
