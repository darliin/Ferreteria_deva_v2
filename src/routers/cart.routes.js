import express from "express";
import auth from "../middlewares/auth.js";
import {
addToCart,
getCart,
removeFromCart,
clearCart
} from "../controllers/cart.controller.js";
import { Router } from "express";


const router = express.Router();

cartRouter.post("/cart", auth, addToCart);
cartRouter.get("/cart", auth, getCart);
cartRouter.delete("/cart/:productId", auth, removeFromCart);
cartRouter.delete("/cart", auth, clearCart);

export default router;