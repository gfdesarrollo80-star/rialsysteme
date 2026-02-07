import { useState } from "react";
import axios from "../../api/axios";
import UserEditModal from "./UserEditModal";

const UserActions = ({ user, onRefresh }) => {
  const [editing, setEditing] = useState(false);

  const toggleActive = async () => {
    const msg = user.activo
      ? "¿Desactivar este usuario?"
      : "¿Activar este usuario?";

    if (!confirm(msg)) return;

    try {
      await axios.patch(`/admin/users/${user.id}/status`, {
        activo: !user.activo,
      });
      onRefresh();
    } catch (err) {
      console.error(err);
      alert("No se pudo cambiar el estado");
    }
  };

  const deleteUser = async () => {
    if (!confirm("¿Eliminar usuario definitivamente?")) return;

    try {
      await axios.delete(`/admin/users/${user.id}`);
      onRefresh();
    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar el usuario");
    }
  };

  return (
    <>
      <button onClick={() => setEditing(true)}>✏️</button>{" "}
      <button onClick={toggleActive}>
        {user.activo ? "Desactivar" : "Activar"}
      </button>{" "}
      <button onClick={deleteUser}>❌</button>

      {editing && (
        <UserEditModal
          user={user}
          onClose={() => setEditing(false)}
          onSaved={onRefresh}
        />
      )}
    </>
  );
};

export default UserActions;
