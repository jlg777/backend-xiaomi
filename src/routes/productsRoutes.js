import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productsControllers.js";

const productsRoutes = Router();

productsRoutes.get("/", getAllProducts);

productsRoutes.get("/:id", getProductById);

productsRoutes.post("/", createProduct);

productsRoutes.put("/:id", updateProduct);

productsRoutes.delete("/:id", deleteProduct);

export default productsRoutes;
