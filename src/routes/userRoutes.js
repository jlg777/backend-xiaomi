import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers/userControllers.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";
import uploadAvatar from "../middleware/upload.js";

const userRoutes = Router();

userRoutes.get("/", auth, authorize("admin"), getAllUsers);

userRoutes.get("/:id", auth, authorize("user", "admin"), getUserById);

userRoutes.post("/", uploadAvatar.single("avatar"), createUser);

userRoutes.put(
  "/:id",
  auth,
  authorize("user", "admin"),
  uploadAvatar.single("avatar"),
  updateUser
);

userRoutes.delete("/:id", auth, authorize("admin"), deleteUser);

userRoutes.post("/login", loginUser);

export default userRoutes;
