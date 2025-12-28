import {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  createProduct,
} from "../controllers/product.controller.js";
import { Router } from "express";
import Authentication from "../middlewares/auth.js";

const productRouter = Router();

productRouter.get("/get", getAllProducts);
productRouter.post("/create", Authentication, createProduct);
productRouter.get("/getById/:id", getProductById);
productRouter.put("/update/:id", Authentication, updateProduct);
productRouter.delete("/delete/:id", Authentication, deleteProduct);

export default productRouter;
