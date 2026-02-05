import { Router } from 'express';
import * as ctrl from '../controllers/fondo_fijo.controller.js';
import auth from '../middlewares/auth.js';
const router=Router();
router.get('/gastos',auth,ctrl.listarGastos);
router.post('/gastos',auth,ctrl.crearGasto);
router.get('/ingresos',auth,ctrl.listarIngresos);
router.post('/ingresos',auth,ctrl.crearIngreso);
export default router;