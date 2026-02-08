import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const navItemClass = ({ isActive }) =>
    `sidebar-item ${isActive ? "active" : ""}`;

  return (
    <aside className="sidebar">
      {/* 🔝 LOGO */}
      <div className="sidebar-header">
        <div className="logo-icon">💰</div>
        <div className="logo-text">Tesorería</div>
      </div>

      {/* 📌 NAVEGACIÓN */}
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={navItemClass}>
          Reporte
        </NavLink>

        <NavLink to="/fondo-fijo" className={navItemClass}>
          Fondo Fijo
        </NavLink>

        <NavLink to="/fondo-inversion" className={navItemClass}>
          Fondo de Inversión
        </NavLink>

        <NavLink to="/pagos" className={navItemClass}>
          Pagos
        </NavLink>

        <NavLink to="/disponibilidad" className={navItemClass}>
          Disponibilidad
        </NavLink>

        <NavLink to="/ajustes" className={navItemClass}>
          Ajustes
        </NavLink>
      </nav>

      {/* 🔻 FOOTER */}
      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "dark" ? "🌙 Modo oscuro" : "☀️ Modo claro"}
        </button>

        <div className="user-info">
          <span>{user?.username}</span>
        </div>

        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
