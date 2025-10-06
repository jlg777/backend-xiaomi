import { Router } from "express";

const productsRoutes = Router();

productsRoutes.get("/", (_req, res) => {
  res.send("Listado de Productos 🥸");
});

productsRoutes.get("/:id", (req, res) => {
  res.send(`Detalles del producto con ID: ${req.params.id}`);
});

productsRoutes.post("/", (req, res) => {
  res.send(`Agrega nuevo producto ${req}`);
});

productsRoutes.put("/:id", (req, res) => {
  res.send(`Edita del producto con ID: ${req.params.id} y ${req}`);
});

productsRoutes.delete("/:id", (req, res) => {
  res.send(`Borra del producto con ID: ${req.params.id}`);
});

export default productsRoutes;
