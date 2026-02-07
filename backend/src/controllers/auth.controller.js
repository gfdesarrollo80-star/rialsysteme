import pool from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
      return res.status(400).json({
        error: "Usuario y contraseña requeridos",
      });
    }

    const { rows } = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = $1 AND activo = true",
      [usuario]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(
      contrasena,
      user.contrasena
    );

    if (!validPassword) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol_id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        rol_id: user.rol_id,
      },
    });
  } catch (err) {
    err.status = 500;
    throw err;
  }
};
