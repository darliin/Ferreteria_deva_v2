import express from "express";
import Authentication from "../middlewares/auth.js";
import {
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

cartRouter.post("/cart", Authentication, addToCart);
cartRouter.get("/cart", Authentication, getCart);
cartRouter.delete("/cart/:productId", Authentication, removeFromCart);
cartRouter.delete("/cart", Authentication, clearCart);

export default router;
