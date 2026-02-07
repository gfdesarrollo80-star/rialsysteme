import UserActions from "./UserActions";
import { ROLES } from "../../utils/roles";

const UsersTable = ({ users, onRefresh }) => {
  return (
    <table width="100%" border="1" cellPadding="8">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Usuario</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {users.length === 0 && (
          <tr>
            <td colSpan="6" style={{ textAlign: "center" }}>
              No hay usuarios registrados
            </td>
          </tr>
        )}

        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.nombre}</td>
            <td>{u.usuario}</td>
            <td>{ROLES[u.rol_id] || "Desconocido"}</td>
            <td>
              {u.activo ? (
                <span style={{ color: "green", fontWeight: "bold" }}>
                  Activo
                </span>
              ) : (
                <span style={{ color: "red", fontWeight: "bold" }}>
                  Inactivo
                </span>
              )}
            </td>
            <td>
              <UserActions user={u} onRefresh={onRefresh} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
