import { Router } from "express";
import { createOrder, deleteOrder, getOrderById, getOrders, updateOrderStatus } from "../controllers/ordersControllers.js";

const orderRoutes = Router();

orderRoutes.post("/", createOrder);
orderRoutes.get("/", getOrders);
orderRoutes.get("/:id",getOrderById )
orderRoutes.put("/:id",updateOrderStatus )
orderRoutes.delete("/:id", deleteOrder)

export default orderRoutes;
