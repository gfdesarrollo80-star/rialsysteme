import pool from '../database/db.js';
export const listar=async(req,res)=>{
 const {rows}=await pool.query('SELECT * FROM fondo_inversion ORDER BY fecha DESC');
 res.json(rows);
};
export const crear=async(req,res)=>{
 const data=req.body;
 const keys=Object.keys(data).join(',');
 const values=Object.values(data);
 const params=values.map((_,i)=>'$'+(i+1)).join(',');
 await pool.query(`INSERT INTO fondo_inversion(${keys}) VALUES(${params})`,values);
 res.json({mensaje:'Fondo inversión registrado'});
};