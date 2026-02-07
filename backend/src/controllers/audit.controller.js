import pool from "../database/db.js";

export const getAuditLogs = async (req, res) => {
  try {
    // Solo admin
    if (req.user.rol !== 1) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const result = await pool.query(`
      SELECT 
        id,
        usuario,
        accion,
        tabla,
        fecha
      FROM auditoria
      ORDER BY fecha DESC
      LIMIT 100
    `);

    res.json(result.rows);
  } catch (err) {
    console.error("AUDIT ERROR:", err);
    res.status(500).json({ error: "Error obteniendo auditoría" });
  }
};
