import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <h3>Rialsysteme</h3>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>

        {user?.role === "admin" && (
          <NavLink to="/admin">Administración</NavLink>
        )}
      </nav>
    </aside>
  );
}
