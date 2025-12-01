import { Router } from "express";
import productsRoutes from "./productsRoutes.js";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js";

const router = Router();

// Ruta básica
router.get("/", (_req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

//subrutas
router.use("/products", productsRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);


export default router;
