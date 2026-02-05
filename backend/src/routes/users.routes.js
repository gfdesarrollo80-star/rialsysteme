import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/users.controller.js";

const router = Router();

// 🔐 RUTAS PROTEGIDAS
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUserById);
router.post("/", verifyToken, createUser);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
