import { Router } from "express";
import { crearUsuario, listarUsuarios } from "../controllers/users.controller.js";
import auth from "../middlewares/auth.js";
import rol from "../middlewares/rol.js";

const router = Router();

router.get("/", auth, listarUsuarios);
router.post("/", auth, rol("colaborador"), crearUsuario);

export default router;