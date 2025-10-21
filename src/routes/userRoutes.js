import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers/userControllers.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);

userRoutes.get("/:id", getUserById);

userRoutes.post("/", createUser);

userRoutes.put("/:id", updateUser);

userRoutes.delete("/:id", deleteUser);

userRoutes.post("/login", loginUser);

export default userRoutes;
