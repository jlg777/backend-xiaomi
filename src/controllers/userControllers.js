import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const saltRounds = parseInt(process.env.SALT_ROUND_HASH);

export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los usuarios 😵‍💫" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return !user
      ? res.status(404).json({ error: "Usuario no encontrado 😵‍💫" })
      : res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el usuario 😵‍💫" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    if (!password) {
      res.status(400).json({ error: "La contraseña es obligatoria 🔑" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ ...rest, password: hashedPassword });
    const saved = await newUser.save();
    //const { password: _, ...userWithoutPassword } = saved.toObject();
    res.status(200).json(saved);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "Error al crear el usuario 😵‍💫", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    //console.log(req.user);
    if (
      req.user._id.toString() !== req.params.id &&
      req.user.roleAdmin !== "admin"
    ) {
      return res
        .status(403)
        .json({ error: "No puedes acceder o modificar otro usuario" });
    }

    // Filtrar campos permitidos para actualizar
    const allowedUpdates = ["name", "email", "avatar", "password"];
    const updates = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field]) {
        // esto ignora "", null o undefined
        updates[field] = req.body[field];
      }
    });

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, saltRounds);
    }
    //console.log('user',req.user)
    /*if (req.file) {
      updates.avatar = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }*/

    const updated = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    //console.log(updated);
    return !updated
      ? res.status(404).json({ error: "Usuario no encontrado 😵‍💫" })
      : res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(400).json({
      error: "Error al actualizar el usuario 😵‍💫",
      details: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    return !deleted
      ? res.status(404).json({ error: "Usuario no encontrado 😵‍💫" })
      : res.status(200).json({ message: "Usuario eliminado correctamente 😵‍💫" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el usuario 😵‍💫" });
  }
};

export const loginUser = async (req, res) => {
  const secret = process.env.JWT_SECRET;
  //console.log(secret);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Correo o contraseña incorrectos" });
    }

    const token = jwt.sign(user.toObject(), secret, { expiresIn: "1h" });
    //console.log(token);
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ userWithoutPassword, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor al iniciar sesión" });
  }
};

export const authUser = (req, res) => {
  res.json({ message: "Acceso permitido al usuario", user: req.user });
};
