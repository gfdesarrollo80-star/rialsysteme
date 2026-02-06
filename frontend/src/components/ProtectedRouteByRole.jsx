import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRouteByRole({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!user || user.role !== role) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}
