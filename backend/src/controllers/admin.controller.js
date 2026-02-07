import pool from "../database/db.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Seguridad por rol (admin = rol_id 1)
    if (req.user.rol !== 1) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    const totalUsers = await pool.query(
      "SELECT COUNT(*) FROM usuarios"
    );

    const activeUsers = await pool.query(
      "SELECT COUNT(*) FROM usuarios WHERE activo = true"
    );

    const inactiveUsers = await pool.query(
      "SELECT COUNT(*) FROM usuarios WHERE activo = false"
    );

    res.json({
      totalUsers: Number(totalUsers.rows[0].count),
      activeUsers: Number(activeUsers.rows[0].count),
      inactiveUsers: Number(inactiveUsers.rows[0].count),
    });
  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ error: "Error obteniendo métricas" });
  }
};
