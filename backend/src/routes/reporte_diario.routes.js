import { Router } from 'express';
import * as ctrl from '../controllers/reporte_diario.controller.js';
import auth from '../middlewares/auth.js';

const router = Router();

router.get('/', auth, ctrl.obtenerReporte);
router.post('/saldos-iniciales', auth, ctrl.guardarSaldosIniciales);
router.post('/cerrar', auth, ctrl.cerrarDia);

export default router;
