import pool from "../database/db.js";
import bcrypt from "bcryptjs";

// GET /api/users
export const getUsers = async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, nombre, usuario, rol_id, activo FROM usuarios"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

// GET /api/users/:id
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT id, nombre, usuario, rol_id, activo FROM usuarios WHERE id = $1",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
};

// POST /api/users
export const createUser = async (req, res) => {
  try {
    const { nombre, usuario, password, rol_id } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      `INSERT INTO usuarios (nombre, usuario, contrasena, rol_id, activo)
       VALUES ($1, $2, $3, $4, true)
       RETURNING id, nombre, usuario, rol_id`,
      [nombre, usuario, hashedPassword, rol_id]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

// PUT /api/users/:id
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, usuario, rol_id, activo } = req.body;

    await pool.query(
      `UPDATE usuarios
       SET nombre = $1, usuario = $2, rol_id = $3, activo = $4
       WHERE id = $5`,
      [nombre, usuario, rol_id, activo, id]
    );

    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "UPDATE usuarios SET activo = false WHERE id = $1",
      [id]
    );

    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
};
