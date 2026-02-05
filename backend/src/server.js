import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

// Health check (opcional pero útil)
app.get("/", (req, res) => {
  res.send("API Tesorería funcionando ✅");
});

// Puerto
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor Tesorería ejecutándose en puerto ${PORT}`);
});
