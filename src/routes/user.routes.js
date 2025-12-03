import { Router } from "express";
import {
  authUser,
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/role.js";
import uploadAvatar from "../middleware/upload.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const userRoutes = Router();
userRoutes.get("/", authMiddleware, auth, authorize("user"), authUser); //authMiddleware valida token

userRoutes.get("/all", auth, authorize("admin"), getAllUsers);

userRoutes.get("/all/:id", auth, authorize("user", "admin"), getUserById);

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
