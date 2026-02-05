import pool from '../database/db.js';
export const listarGastos=async(req,res)=>{
 const {rows}=await pool.query('SELECT * FROM fondo_fijo_gastos ORDER BY fecha DESC');
 res.json(rows);
};
export const crearGasto=async(req,res)=>{
 const {fecha,proveedor,detalle,numero_factura,monto,metodo}=req.body;
 await pool.query(
 'INSERT INTO fondo_fijo_gastos VALUES (DEFAULT,$1,$2,$3,$4,$5,$6)',
 [fecha,proveedor,detalle,numero_factura,monto,metodo]
 );
 res.json({mensaje:'Gasto registrado'});
};
export const listarIngresos=async(req,res)=>{
 const {rows}=await pool.query('SELECT * FROM fondo_fijo_ingresos ORDER BY fecha DESC');
 res.json(rows);
};
export const crearIngreso=async(req,res)=>{
 const {fecha,detalle,monto}=req.body;
 await pool.query(
 'INSERT INTO fondo_fijo_ingresos VALUES (DEFAULT,$1,$2,$3)',
 [fecha,detalle,monto]
 );
 res.json({mensaje:'Ingreso registrado'});
};