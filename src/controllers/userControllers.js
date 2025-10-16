import User from "../models/userModel";

export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
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
    res.status(500).json({ error: "Error al obtener el usuario 😵‍💫" });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(200).json(saved);
  } catch (error) {
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
  } catch (error) {}
  res.status(500).json({ error: "Error al eliminar el usuario 😵‍💫" });
};
