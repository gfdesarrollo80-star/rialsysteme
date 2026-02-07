import pool from "../database/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    console.log("=== LOGIN REQUEST ===");
    console.log("BODY:", req.body);

    if (!usuario || !contrasena) {
      console.log("❌ Faltan credenciales");
      return res.status(400).json({
        error: "Usuario y contraseña requeridos",
      });
    }

    const { rows } = await pool.query(
      "SELECT * FROM usuarios WHERE usuario = $1 AND activo = true",
      [usuario]
    );

    console.log("QUERY RESULT:", rows);

    if (rows.length === 0) {
      console.log("❌ Usuario no encontrado o inactivo");
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const user = rows[0];

    console.log("USUARIO DB:", user.usuario);
    console.log("HASH DB:", user.contrasena);
    console.log("PASSWORD ENVIADO:", contrasena);

    const validPassword = await bcrypt.compare(
      contrasena,
      user.contrasena
    );

    console.log("BCRYPT COMPARE RESULT:", validPassword);

    if (!validPassword) {
      console.log("❌ PASSWORD NO COINCIDE");
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol_id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    console.log("✅ LOGIN OK PARA:", user.usuario);

    res.json({
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        rol_id: user.rol_id,
      },
    });
  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
