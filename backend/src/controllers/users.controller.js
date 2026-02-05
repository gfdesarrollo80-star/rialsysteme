import pool from "../database/db.js";
import bcrypt from "bcryptjs";

export const listarUsuarios = async (req, res) => {
  const { rows } = await pool.query("SELECT id, nombre, usuario, rol_id, activo FROM usuarios");
  res.json(rows);
};

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, usuario, contrasena, rol_id } = req.body;

    const hash = await bcrypt.hash(contrasena, 10);

    await pool.query(
      "INSERT INTO usuarios(nombre, usuario, contrasena, rol_id, activo) VALUES($1,$2,$3,$4,true)",
      [nombre, usuario, hash, rol_id]
    );

    res.json({ mensaje: "Usuario creado correctamente" });

  } catch (err) {
    res.status(500).json({ error: "Error creando usuario" });
  }
};