import { Router } from "express";

const router = Router();

// 401 Unauthorized
router.get("/401", (_req, res) => {
  res.status(401).json({ message: "No autorizado (401) - prueba" });
});

// 403 Forbidden
router.get("/403", (_req, res) => {
  res.status(403).json({ message: "Prohibido (403) - prueba" });
});

// 404 Not Found
router.get("/404", (_req, res) => {
  res.status(404).json({ message: "Ruta no encontrada (404) - prueba" });
});

// 500 Internal Server Error
router.get("/500", (_req, res) => {
  res
    .status(500)
    .json({ message: "Error interno del servidor (500) - prueba" });
});

// Network Error: no se puede simular desde backend, se hace apagando el servidor
// Ej: cambiar puerto, desconectar backend, o usar DevTools offline

export default router;
