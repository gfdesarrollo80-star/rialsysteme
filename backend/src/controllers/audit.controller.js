import pool from "../database/db.js";
import { generateAuditPDF } from "../services/auditPdf.service.js";

export const getAuditLogs = async (req, res) => {
  try {
    // 🔐 Solo admin
    if (req.user.rol !== 1) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const {
      usuario,
      desde,
      hasta,
      page = 1,
      limit = 10,
      order = "desc",
      pdf,
    } = req.query;

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

    const sortOrder = order === "asc" ? "ASC" : "DESC";

    // 📄 PDF (sin paginación)
    if (pdf === "true") {
      const result = await pool.query(
        `
        SELECT id, usuario, accion, tabla, fecha
        FROM auditoria
        ${whereClause}
        ORDER BY fecha ${sortOrder}
        `,
        values
      );

      return generateAuditPDF(result.rows, res);
    }

    // 📄 Normal (con paginación)
    const offset = (page - 1) * limit;

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM auditoria ${whereClause}`,
      values
    );

    const dataResult = await pool.query(
      `
      SELECT id, usuario, accion, tabla, fecha
      FROM auditoria
      ${whereClause}
      ORDER BY fecha ${sortOrder}
      LIMIT $${idx} OFFSET $${idx + 1}
      `,
      [...values, limit, offset]
    );

    res.json({
      data: dataResult.rows,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: Number(countResult.rows[0].count),
        totalPages: Math.ceil(
          countResult.rows[0].count / limit
        ),
      },
    });
  } catch (err) {
    console.error("AUDIT ERROR:", err);
    res.status(500).json({ error: "Error en auditoría" });
  }
};
