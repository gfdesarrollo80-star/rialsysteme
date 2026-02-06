import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/admin/data",
  verifyToken,
  requireRole([1]), // solo admin
  (req, res) => {
    res.json({ mensaje: "Datos solo para admin" });
  }
);

export default router;
