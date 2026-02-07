import UserActions from "./UserActions";

const UsersTable = ({ users, onRefresh }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Rol</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>{u.is_active ? "Activo" : "Inactivo"}</td>
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
