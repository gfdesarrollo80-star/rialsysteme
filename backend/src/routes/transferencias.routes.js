import { Router } from 'express';
import * as ctrl from '../controllers/transferencias.controller.js';
import auth from '../middlewares/auth.js';
const router=Router();
router.get('/',auth,ctrl.listar);
router.post('/',auth,ctrl.crear);
export default router;