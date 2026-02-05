import pool from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    const query = "SELECT * FROM usuarios WHERE usuario = $1 AND activo = true";
    const { rows } = await pool.query(query, [usuario]);

    if (rows.length === 0)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const user = rows[0];

    const validPassword = await bcrypt.compare(password, user.contrasena);
    if (!validPassword)
      return res.status(401).json({ error: "Credenciales incorrectas" });

    const token = jwt.sign(
      { id: user.id, rol: user.rol_id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      mensaje: "Inicio de sesión correcto",
      token,
      rol: user.rol_id,
      nombre: user.nombre
    });

  } catch (err) {
  console.error("LOGIN ERROR:", err);
  console.error("JWT_SECRET:", process.env.JWT_SECRET);
  res.status(500).json({ error: "Error en el servidor" });
}
};
