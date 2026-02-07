import { useState } from "react";
import axios from "../../api/axios";

const UserActions = ({ user, onRefresh }) => {
  const [loading, setLoading] = useState(false);

  const toggleActive = async () => {
    const msg = user.activo
      ? "¿Desactivar este usuario?"
      : "¿Activar este usuario?";

    if (!confirm(msg)) return;

    try {
      setLoading(true);

      await axios.patch(`/admin/users/${user.id}/status`, {
        activo: !user.activo,
      });

      alert(
        user.activo
          ? "Usuario desactivado correctamente"
          : "Usuario activado correctamente"
      );

      onRefresh();
    } catch (err) {
      console.error(err);
      alert("Error al cambiar el estado del usuario");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    if (!confirm("¿Eliminar usuario definitivamente?")) return;

    try {
      setLoading(true);

      await axios.delete(`/admin/users/${user.id}`);

      alert("Usuario eliminado correctamente");
      onRefresh();
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button disabled title="Edición próximamente">
        ✏️
      </button>{" "}
      <button onClick={toggleActive} disabled={loading}>
        {loading ? "Procesando..." : user.activo ? "Desactivar" : "Activar"}
      </button>{" "}
      <button onClick={deleteUser} disabled={loading}>
        ❌
      </button>
    </>
  );
};

export default UserActions;
