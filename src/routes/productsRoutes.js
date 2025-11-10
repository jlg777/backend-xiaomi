import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productsControllers.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";

const productsRoutes = Router();

productsRoutes.get("/", auth, authorize("admin"), getAllProducts);

productsRoutes.get("/:id",auth, authorize("admin"), getProductById);

productsRoutes.post("/",auth, authorize("admin"), createProduct);

productsRoutes.put("/:id",auth, authorize("admin"), updateProduct);

productsRoutes.delete("/:id",auth, authorize("admin"), deleteProduct);

export default productsRoutes;
