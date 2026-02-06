import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadUsers = async () => {
    const res = await axios.get("/admin/users");
    setUsers(res.data);
    setLoading(false);
  };

  const deleteUser = async (id) => {
    if (!confirm("¿Desactivar usuario?")) return;
    await axios.delete(`/admin/users/${id}`);
    loadUsers();
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

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.usuario}</td>
              <td>{u.rol_id}</td>
              <td>{u.activo ? "Sí" : "No"}</td>
              <td>
                <button onClick={() => deleteUser(u.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
