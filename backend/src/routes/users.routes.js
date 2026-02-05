import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta protegida de prueba
router.get("/me", verifyToken, (req, res) => {
  res.json({
    mensaje: "Acceso autorizado ✅",
    usuario: req.user
  });
});

export default router;
