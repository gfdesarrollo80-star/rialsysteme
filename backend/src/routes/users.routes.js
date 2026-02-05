import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", verifyToken, (req, res) => {
  res.json({
    mensaje: "Acceso autorizado",
    usuario: req.user
  });
});

export default router;
