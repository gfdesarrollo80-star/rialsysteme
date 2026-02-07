import { Router } from "express";
import { verifyToken } from "../middlewares/auth.js";
import { getDashboardStats } from "../controllers/admin.controller.js";
import { getAuditLogs } from "../controllers/audit.controller.js";

const router = Router();

// Dashboard
router.get("/dashboard", verifyToken, getDashboardStats);

// Auditoría
router.get("/audit", verifyToken, getAuditLogs);

export default router;
