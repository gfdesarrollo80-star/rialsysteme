export default function rol(tipo) {
  return (req, res, next) => {
    if (tipo === "colaborador" && req.usuario.rol !== 1)
      return res.status(403).json({ error: "No tienes permiso" });

    next();
  };
}