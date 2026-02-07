import UserActions from "./UserActions";

const UsersTable = ({ users, onRefresh }) => {
  return (
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
              <UserActions user={u} onRefresh={onRefresh} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
