import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import UsersTable from "../components/users/UsersTable";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      setLoading(true);

      // ✅ RUTA REAL SEGÚN EL BACKEND
      const res = await api.get("/users");

      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div>
      <h1>Usuarios</h1>

      <button onClick={() => navigate("/admin/users/create")}>
        ➕ Nuevo usuario
      </button>

      <br />
      <br />

      <UsersTable users={users} onRefresh={loadUsers} />
    </div>
  );
}
