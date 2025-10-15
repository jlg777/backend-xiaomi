import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userControllers.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);

userRoutes.get("/:id", getUserById);

userRoutes.post("/:id", createUser);

userRoutes.put("/:id", updateUser);

userRoutes.delete("/:id", deleteUser);

export default userRoutes;
