import express, { json } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
//import mongoose from "mongoose";
import routes from "./routes/homeRoutes.js";

// Puerto
const PORT = process.env.PORT;
//const MONGO_URI = process.env.MONGO_URI;

// Middleware (opcional para parsear JSON)
app.use(json());

// Conexión a MongoDB Atlas
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ Conectado a MongoDB Atlas"))
//   .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Usa las rutas (se importan todas desde index.js)
app.use("/", routes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
