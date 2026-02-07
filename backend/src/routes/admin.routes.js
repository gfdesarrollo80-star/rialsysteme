import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";
import { getDashboardStats } from "../controllers/admin.controller.js";

const router = Router();

router.get("/dashboard", verifyToken, verifyAdmin, getDashboardStats);

export default router;
