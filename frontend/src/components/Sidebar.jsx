import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <h3>Rialsysteme</h3>

      <nav>
        <NavLink to="/dashboard">Dashboard</NavLink>

        {user?.rol_id === 1 && (
          <>
            <NavLink to="/admin">Administración</NavLink>
            <NavLink to="/admin/users">Usuarios</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}
