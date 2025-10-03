import express, { json } from "express";
const app = express();

// Puerto
const PORT = process.env.PORT || 3000;

// Middleware (opcional para parsear JSON)
app.use(json());

// Ruta básica
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
