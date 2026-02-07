import pool from "../database/db.js";

export const getAuditLogs = async (req, res) => {
  try {
    // Seguridad: solo admin
    if (req.user.rol !== 1) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const { usuario, desde, hasta } = req.query;

    let conditions = [];
    let values = [];
    let idx = 1;

    if (usuario) {
      conditions.push(`usuario ILIKE $${idx}`);
      values.push(`%${usuario}%`);
      idx++;
    }

    if (desde) {
      conditions.push(`fecha >= $${idx}`);
      values.push(desde);
      idx++;
    }

    if (hasta) {
      conditions.push(`fecha <= $${idx}`);
      values.push(hasta);
      idx++;
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

    const query = `
      SELECT 
        id,
        usuario,
        accion,
        tabla,
        fecha
      FROM auditoria
      ${whereClause}
      ORDER BY fecha DESC
      LIMIT 100
    `;

    const result = await pool.query(query, values);

    res.json(result.rows);
  } catch (err) {
    console.error("AUDIT FILTER ERROR:", err);
    res.status(500).json({ error: "Error obteniendo auditoría" });
  }
};
