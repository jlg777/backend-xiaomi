//import { products } from "../mockData/products.js";
import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    //console.log("query params", req.query);
    const { page = 1, limit = 1, category = "all" } = req.query;

    // OBJETO DE FILTRO DINÁMICO
    let filter = {};

    // FILTRO DE CATEGORÍA
    if (category !== "all") {
      filter.category = category;
    }

    const products = await Product.find(filter)
      .limit(limit)
      .skip((page - 1) * limit);
    const totalProducts = await Product.countDocuments(filter);

    res.status(200).send({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
    });
    //res.status(200).json({ message: "Productos obtenidos", page, limit });
  } catch (error) {
    console.error("Error al obtener productos 😵‍💫:", error.message);
    res.status(500).json({ error: "Error al obtener productos 😵‍💫" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ error: "Producto no encontrado 😵‍💫" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error al obtener el producto 😵‍💫:", error.message);
    res.status(500).json({ error: "Error al obtener el producto 😵‍💫" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error al crear el producto 😵‍💫:", error.message);
    res
      .status(400)
      .json({ error: "Error al crear el producto 😵‍💫", details: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ error: "Producto no encontrado 😵‍💫" });
    res.json(updated);
  } catch (error) {
    console.error("Error al actualizar el producto 😵‍💫:", error.message);
    res.status(400).json({
      error: "Error al actualizar el producto 😵‍💫",
      details: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Producto no encontrado 😵‍💫" });
    res.json({ message: "Producto eliminado correctamente 😵‍💫" });
  } catch (error) {
    console.error("Error al eliminar el producto 😵‍💫:", error.message);
    res.status(500).json({ error: "Error al eliminar el producto 😵‍💫" });
  }
};
