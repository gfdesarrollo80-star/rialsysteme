import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/role.middleware.js";

import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.js";

const router = Router();

// Middleware admin global
router.use(verifyToken, requireRole([1]));

// Test admin
router.get("/admin/data", (req, res) => {
  res.json({ mensaje: "Datos solo para admin" });
});

// CRUD USUARIOS (ADMIN)
router.get("/admin/users", getUsers);
router.get("/admin/users/:id", getUserById);
router.post("/admin/users", createUser);
router.put("/admin/users/:id", updateUser);
router.delete("/admin/users/:id", deleteUser);

export default router;
