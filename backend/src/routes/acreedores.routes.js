import { Router } from 'express';
import * as ctrl from '../controllers/acreedores.controller.js';
import auth from '../middlewares/auth.js';

const router = Router();
router.get('/', auth, ctrl.listar);
router.post('/', auth, ctrl.crear);
router.put('/:id', auth, ctrl.editar);
router.delete('/:id', auth, ctrl.eliminar);
export default router;