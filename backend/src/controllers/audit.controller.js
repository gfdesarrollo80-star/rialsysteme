import pool from "../database/db.js";

export const getAuditLogs = async (req, res) => {
  try {
    // Seguridad: solo admin
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
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const offset = (pageNum - 1) * limitNum;
    const sortOrder = order.toLowerCase() === "asc" ? "ASC" : "DESC";

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

    // Total para paginación
    const countQuery = `
      SELECT COUNT(*) 
      FROM auditoria
      ${whereClause}
    `;
    const countResult = await pool.query(countQuery, values);
    const total = Number(countResult.rows[0].count);

    // Datos paginados
    const dataQuery = `
      SELECT 
        id,
        usuario,
        accion,
        tabla,
        fecha
      FROM auditoria
      ${whereClause}
      ORDER BY fecha ${sortOrder}
      LIMIT $${idx} OFFSET $${idx + 1}
    `;

    const dataResult = await pool.query(dataQuery, [
      ...values,
      limitNum,
      offset,
    ]);

    res.json({
      data: dataResult.rows,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (err) {
    console.error("AUDIT PAGINATION ERROR:", err);
    res.status(500).json({ error: "Error obteniendo auditoría" });
  }
};
