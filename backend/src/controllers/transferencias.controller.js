import pool from '../database/db.js';
export const listar=async(req,res)=>{
 const {rows}=await pool.query('SELECT * FROM transferencias ORDER BY fecha DESC');
 res.json(rows);
};
export const crear=async(req,res)=>{
 const {origen,destino,monto}=req.body;
 await pool.query(
 'INSERT INTO transferencias(origen,destino,monto) VALUES($1,$2,$3)',
 [origen,destino,monto]
 );
 res.json({mensaje:'Transferencia realizada'});
};