import { useState } from "react";
import axios from "../../api/axios";

const UserEditModal = ({ user, onClose, onSaved }) => {
  const [nombre, setNombre] = useState(user.nombre);
  const [usuario, setUsuario] = useState(user.usuario);
  const [rolId, setRolId] = useState(user.rol_id);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await axios.put(`/admin/users/${user.id}`, {
        nombre,
        usuario,
        rol_id: rolId,
      });
      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al actualizar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Editar usuario</h3>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Nombre</label>
            <br />
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Usuario</label>
            <br />
            <input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Rol</label>
            <br />
            <select
              value={rolId}
              onChange={(e) => setRolId(e.target.value)}
            >
              <option value={1}>Admin</option>
              <option value={2}>Usuario</option>
            </select>
          </div>

          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>{" "}
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

/* estilos inline simples, luego los movemos */
const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px",
};

export default UserEditModal;
