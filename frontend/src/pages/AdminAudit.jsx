import { useEffect, useState } from "react";
import axios from "../api/axios";

const AdminAudit = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [usuario, setUsuario] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const loadLogs = async () => {
    try {
      setLoading(true);

      const params = {};
      if (usuario) params.usuario = usuario;
      if (desde) params.desde = desde;
      if (hasta) params.hasta = hasta;

      const res = await axios.get("/audit", { params });
      setLogs(res.data);
    } catch (err) {
      console.error(err);
      alert("Error cargando auditoría");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <div>
      <h1>Auditoría del sistema</h1>

      {/* 🔎 FILTROS */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />

        <input
          type="date"
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
        />

        <input
          type="date"
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
        />

        <button onClick={loadLogs}>Filtrar</button>
      </div>

      {loading ? (
        <p>Cargando auditoría...</p>
      ) : (
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Tabla</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No hay resultados
                </td>
              </tr>
            )}

            {logs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.usuario}</td>
                <td>{log.accion}</td>
                <td>{log.tabla}</td>
                <td>{new Date(log.fecha).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminAudit;
