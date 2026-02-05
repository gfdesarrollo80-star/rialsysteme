import pool from '../database/db.js';

export const logAccess = async (req,res,next)=>{
  const usuarioId = req.usuario?.id || null;
  await pool.query(
    `INSERT INTO auditoria_accesos(usuario_id, fecha, ip, estado)
     VALUES($1,NOW(),$2,'OK')`,
    [usuarioId, req.ip]
  );
  next();
};