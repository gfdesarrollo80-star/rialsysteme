import { useEffect, useState } from "react";
import axios from "../api/axios";

const AdminAudit = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadLogs = async () => {
    try {
      const res = await axios.get("/audit");
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

  if (loading) return <p>Cargando auditoría...</p>;

  return (
    <div>
      <h1>Auditoría del sistema</h1>

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
    </div>
  );
};

export default AdminAudit;
