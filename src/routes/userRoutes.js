import { Router } from "express";

const userRoutes = Router();

userRoutes.get("/", (_req, res) => {
  res.send("Listado de Users 🥸");
});

userRoutes.get("/:id", (req, res) => {
  res.send(`Detalles del User con ID: ${req.params.id}`);
});

userRoutes.post("/", (req, res) => {
  res.send(`Agrega nuevo User ${req}`);
});

userRoutes.put("/:id", (req, res) => {
  res.send(`Edita el User con ID: ${req.params.id} y ${req}`);
});

userRoutes.delete("/:id", (req, res) => {
  res.send(`Borra del User con ID: ${req.params.id}`);
});

export default userRoutes;
