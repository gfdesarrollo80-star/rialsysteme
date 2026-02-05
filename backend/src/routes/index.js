import { Router } from "express";
const router = Router();

import authRoutes from "./auth.routes.js";
import userRoutes from "./users.routes.js";

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;