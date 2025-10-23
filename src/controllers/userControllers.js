import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

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
    const { password: _, ...userWithoutPassword } = saved.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "Error al crear el usuario 😵‍💫", details: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor al iniciar sesión" });
  }
};
