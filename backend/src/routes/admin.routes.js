import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { getDashboardStats } from "../controllers/admin.controller.js";

const router = Router();

router.get("/dashboard", verifyToken, getDashboardStats);

export default router;
