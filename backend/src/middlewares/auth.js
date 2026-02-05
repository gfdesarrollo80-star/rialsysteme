import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).json({ error: "No autorizado" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Token inválido" });
  }
}