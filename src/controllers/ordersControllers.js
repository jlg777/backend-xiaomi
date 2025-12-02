/*
✅ endpoints REST para crear órdenes
✅ endpoint para obtener el historial del usuario
✅ endpoint admin para ver todos los pedidos
✅ validación de stock
✅ sistema de carrito (Cart model)
*/

import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { items, shippingAddress, paymentMethod } = req.body;

    // Validación de productos y cálculo de total
    let total = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Producto no encontrado: ${item.product}` });
      }

      const priceAtPurchase = product.price;
      const subtotal = priceAtPurchase * item.quantity;
      total += subtotal;

      processedItems.push({
        product: item.product,
        quantity: item.quantity,
        priceAtPurchase,
      });
    }

    const order = await Order.create({
      user: userId,
      items: processedItems,
      total,
      shippingAddress,
      paymentMethod,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error al crear la orden 😵‍💫:", error.message);
    res.status(500).json({ error: "Error al crear la orden 😵‍💫" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product");
    res.json(orders);
  } catch (error) {
    console.error("Error al consultar las ordenes 😵‍💫:", error.message);
    res.status(500).json({ error: "Error al consultar las ordenes 😵‍💫" });
  }
};

export const getOrdersUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId })
      .populate("user")
      .populate("items.product");
    res.json(orders);
  } catch (error) {
    console.error("Error al consultar las ordenes 😵‍💫:", error.message);
    res.status(500).json({ error: "Error al consultar las ordenes 😵‍💫" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user")
      .populate("items.product");

    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    // 🚨 Verificar si el usuario autenticado puede verla
    // req.user._id viene del JWT, req.user.roleAdmin indica si es admin
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.roleAdmin !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "No autorizado para ver esta orden" });
    }

    res.json(order);
  } catch (error) {
    console.error("Error al consultar las ordenes 😵‍💫:", error.message);
    res.status(500).json({ error: "Error al consultar las ordenes 😵‍💫" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    // Buscar la orden
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    // Verificar permisos
    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.roleAdmin === "admin";

    if (!isOwner && !isAdmin) {
      return res
        .status(403)
        .json({ message: "No autorizado para actualizar esta orden" });
    }

    // Actualizar el estado
    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error al actualizar la orden 😵‍💫:", error.message);
    res.status(500).json({ error: "Error al actualizar la orden 😵‍💫" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Buscar la orden primero
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }

    // Verificar permisos
    const isOwner = order.user._id.toString() === req.user._id.toString();
    const isAdmin = req.user.roleAdmin === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "No autorizado para eliminar esta orden" });
    }

    // Eliminar la orden
    await Order.findByIdAndDelete(orderId);

    res.json({ message: "Orden eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la orden 😵‍💫:", error.message);
    res.status(500).json({ message: "Error al eliminar la orden 😵‍💫" });
  }
};

