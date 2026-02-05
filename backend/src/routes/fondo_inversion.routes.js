import { Router } from 'express';
import * as ctrl from '../controllers/fondo_inversion.controller.js';
import auth from '../middlewares/auth.js';
const router=Router();
router.get('/',auth,ctrl.listar);
router.post('/',auth,ctrl.crear);
export default router;