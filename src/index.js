import express, { json } from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import routes from "./routes/homeRoutes.js";

app.use(cors());

// Puerto
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
//const MONGO_LOCAL = process.env.MONGO_LOCAL;

// Middleware (opcional para parsear JSON)
app.use(json());

app.use("/uploads", express.static("uploads"));

// Conexión a MongoDB Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

// Usa las rutas (se importan todas desde index.js)
app.use("/", routes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
