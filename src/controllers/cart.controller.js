import express from "express";
const router = express.Router();

import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import auth from "../middleware/auth.middleware.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; 

  if (!productId || !quantity) {
    return res.status(400).json({ message: "productId and quantity are required" });
  }

  if (quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be greater than 0" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        products: [{ productId, quantity }]
      });
      return res.status(201).json(cart);
    }

    const index = cart.products.findIndex(
      p => p.productId.toString() === productId
    );

    if (index > -1) {
      cart.products[index].quantity = quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    return res.status(200).json(cart);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id })
      .populate("products.productId");

    if (!cart) {
      return res.status(200).json({ products: [] });
    }

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
    p => p.productId.toString() !== productId
    );

    await cart.save();
    res.status(200).json(cart);

} catch (error) {
    res.status(500).json({ message: "Server error" });
}
};

export const clearCart = async (req, res) => {
try {
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(200).json({ message: "Cart cleared successfully" });
} catch (error) {
    res.status(500).json({ message: "Server error" });
}
};
