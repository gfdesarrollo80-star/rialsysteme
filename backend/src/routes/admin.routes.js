import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getDashboardStats } from "../controllers/admin.controller.js";

const router = Router();

// Dashboard (solo admin, validado en controller)
router.get("/dashboard", verifyToken, getDashboardStats);

export default router;
