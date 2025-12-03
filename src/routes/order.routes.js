import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  getOrdersUser,
  updateOrderStatus,
} from "../controllers/orders.controller.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";

const orderRoutes = Router();

orderRoutes.post("/", auth, authorize("user", "admin"), createOrder);
orderRoutes.get("/users", auth, authorize("admin"), getOrders);
orderRoutes.get("/user", auth, authorize("user", "admin"), getOrdersUser);
orderRoutes.get("/:id", auth, authorize("user", "admin"), getOrderById);
orderRoutes.put("/:id", auth, authorize("user", "admin"), updateOrderStatus);
orderRoutes.delete("/:id", auth, authorize("user", "admin"), deleteOrder);

export default orderRoutes;
