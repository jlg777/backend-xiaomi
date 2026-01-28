import { Router } from "express";
import productsRoutes from "./products.routes.js";
import userRoutes from "./user.routes.js";
import orderRoutes from "./order.routes.js";
import testErrorsRoutes from "./testErrors.routes.js";

const router = Router();

// Ruta básica
router.get("/", (_req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

//subrutas
router.use("/products", productsRoutes);
router.use("/user", userRoutes);
router.use("/orders", orderRoutes);
router.use("/test-errors", testErrorsRoutes);

export default router;
