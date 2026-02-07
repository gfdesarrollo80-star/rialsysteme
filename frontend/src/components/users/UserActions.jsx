import api from "../../api/axios";

const UserActions = ({ user, onRefresh }) => {
  const toggleStatus = async () => {
    if (!confirm("¿Cambiar estado del usuario?")) return;

    await api.patch(`/users/${user.id}/status`, {
      is_active: !user.is_active,
    });

    onRefresh();
  };

  const deleteUser = async () => {
    if (!confirm("¿Eliminar usuario?")) return;

    await api.delete(`/users/${user.id}`);
    onRefresh();
  };

  return (
    <>
      <button onClick={toggleStatus}>
        {user.is_active ? "Desactivar" : "Activar"}
      </button>
      <button onClick={deleteUser}>Eliminar</button>
    </>
  );
};

export default UserActions;
