import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function AdminUserCreate() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    password: "",
    rol_id: 2, // por defecto no admin
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/admin/users", form);
      navigate("/admin/users");
    } catch (err) {
      setError("Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Crear Usuario</h1>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <br />
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Usuario</label>
          <br />
          <input
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Rol</label>
          <br />
          <select
            name="rol_id"
            value={form.rol_id}
            onChange={handleChange}
          >
            <option value={1}>Admin</option>
            <option value={2}>Usuario</option>
          </select>
        </div>

        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear usuario"}
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/users")}
          style={{ marginLeft: "10px" }}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
