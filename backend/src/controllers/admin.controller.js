import pool from "../database/db.js";

export const getDashboardStats = async (req, res) => {
  try {
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
    console.error(err);
    res.status(500).json({ error: "Error obteniendo métricas" });
  }
};
