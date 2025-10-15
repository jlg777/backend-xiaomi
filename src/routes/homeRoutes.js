import { Router } from "express";
import productsRoutes from "./productsRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

// Ruta básica
router.get("/", (_req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

//subrutas
router.use("/products", productsRoutes);
router.use("/user", userRoutes);

export default router;
