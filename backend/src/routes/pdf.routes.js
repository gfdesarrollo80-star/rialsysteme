import { Router } from 'express';
import { generarPDFReporteDiario } from '../controllers/pdf.controller.js';
import auth from '../middlewares/auth.js';

const router = Router();
router.get('/reporte-diario', auth, generarPDFReporteDiario);
export default router;
