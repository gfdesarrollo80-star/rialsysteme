import pool from '../database/db.js';

export const listar = async (req,res)=>{
 const {rows}=await pool.query('SELECT * FROM acreedores ORDER BY fecha DESC');
 res.json(rows);
};

export const crear = async (req,res)=>{
 const {cliente,cedula,entidad,monto,metodo_pago,agente,tipo,empresa}=req.body;
 await pool.query(
  `INSERT INTO acreedores(cliente,cedula,entidad,monto,metodo_pago,agente,tipo,empresa)
   VALUES($1,$2,$3,$4,$5,$6,$7,$8)`,
  [cliente,cedula,entidad,monto,metodo_pago,agente,tipo,empresa]
 );
 res.json({mensaje:'Pago de acreedor registrado'});
};

export const editar = async (req,res)=>{
 const {id}=req.params;
 await pool.query('UPDATE acreedores SET monto=$1 WHERE id=$2',[req.body.monto,id]);
 res.json({mensaje:'Actualizado'});
};

export const eliminar = async (req,res)=>{
 await pool.query('DELETE FROM acreedores WHERE id=$1',[req.params.id]);
 res.json({mensaje:'Eliminado'});
};