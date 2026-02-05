import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  getUsers,
  getUserById,
} from "../controllers/users.controller.js";

const router = Router();

// rutas protegidas
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUserById);

export default router;
