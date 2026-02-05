import pool from '../database/db.js';

export const guardarSaldosIniciales = async (req,res)=>{
 const {fecha,banco_id,monto}=req.body;
 await pool.query(
  'INSERT INTO saldos_iniciales(fecha,banco_id,monto) VALUES($1,$2,$3)',
  [fecha,banco_id,monto]
 );
 res.json({mensaje:'Saldo inicial guardado'});
};

export const obtenerReporte = async (req,res)=>{
 const {fecha}=req.query;

 const ingresos = await pool.query(
  'SELECT SUM(total_ingresado) as total FROM fondo_inversion WHERE fecha::date=$1',
  [fecha]
 );

 const egresos = await pool.query(
  'SELECT SUM(monto) as total FROM acreedores WHERE fecha::date=$1',
  [fecha]
 );

 res.json({
  fecha,
  ingresos: ingresos.rows[0].total || 0,
  egresos: egresos.rows[0].total || 0,
  saldo: (ingresos.rows[0].total || 0) - (egresos.rows[0].total || 0)
 });
};

export const cerrarDia = async (req,res)=>{
 const {fecha,usuario_id}=req.body;

 const resumen = await pool.query(
  'SELECT SUM(monto) as egresos FROM acreedores WHERE fecha::date=$1',
  [fecha]
 );

 await pool.query(
  'INSERT INTO cierres_diarios(fecha,usuario_id,total_general) VALUES($1,$2,$3)',
  [fecha,usuario_id,resumen.rows[0].egresos || 0]
 );

 res.json({mensaje:'Día cerrado correctamente'});
};
