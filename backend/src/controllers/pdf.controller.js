import { generarReporteDiarioPDF } from '../services/pdf.service.js';
import pool from '../database/db.js';

export const generarPDFReporteDiario = async (req,res)=>{
  const { fecha } = req.query;

  const ingresos = await pool.query(
    'SELECT SUM(total_ingresado) as total FROM fondo_inversion WHERE fecha::date=$1',[fecha]
  );
  const egresos = await pool.query(
    'SELECT SUM(monto) as total FROM acreedores WHERE fecha::date=$1',[fecha]
  );

  const data = {
    ingresos: ingresos.rows[0].total || 0,
    egresos: egresos.rows[0].total || 0,
    saldo: (ingresos.rows[0].total || 0) - (egresos.rows[0].total || 0)
  };

  const filePath = generarReporteDiarioPDF(data, fecha);
  res.download(filePath);
};