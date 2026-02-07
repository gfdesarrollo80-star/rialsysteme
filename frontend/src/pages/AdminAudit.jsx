import { useEffect, useState } from "react";
import axios from "../api/axios";

const AdminAudit = () => {
  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const [usuario, setUsuario] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const loadLogs = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const params = { page: pageNumber, order };
      if (usuario) params.usuario = usuario;
      if (desde) params.desde = desde;
      if (hasta) params.hasta = hasta;

      const res = await axios.get("/audit", { params });

      setLogs(res.data.data);
      setPagination(res.data.pagination);
      setPage(pageNumber);
    } catch (err) {
      alert("Error cargando auditoría");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const params = new URLSearchParams();
    if (usuario) params.append("usuario", usuario);
    if (desde) params.append("desde", desde);
    if (hasta) params.append("hasta", hasta);
    params.append("order", order);
    params.append("pdf", "true");

    window.open(
      `${import.meta.env.VITE_API_URL}/audit?${params.toString()}`,
      "_blank"
    );
  };

  useEffect(() => {
    loadLogs(1);
  }, []);

  return (
    <div>
      <h1>Auditoría del sistema</h1>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
        <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} />
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">Más recientes</option>
          <option value="asc">Más antiguos</option>
        </select>
        <button onClick={() => loadLogs(1)}>Filtrar</button>
        <button onClick={downloadPDF}>📄 Descargar PDF</button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default AdminAudit;

