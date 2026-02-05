import pool from '../database/db.js';

export default function audit(tabla){
  return async (req,res,next)=>{
    const originalSend = res.json;
    res.json = async function(data){
      if(req.method !== 'GET'){
        const usuarioId = req.usuario?.id || null;
        await pool.query(
          `INSERT INTO auditoria_movimientos(usuario_id, tabla, accion, fecha)
           VALUES($1,$2,$3,NOW())`,
          [usuarioId, tabla, req.method]
        );
      }
      originalSend.call(this,data);
    };
    next();
  };
}