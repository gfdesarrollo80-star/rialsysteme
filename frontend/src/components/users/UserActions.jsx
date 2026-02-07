import { useState } from "react";
import axios from "../../api/axios";
import UserEditModal from "./UserEditModal";

const UserActions = ({ user, onRefresh }) => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

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

      await axios.delete(`/admin/users/${user.id}`
