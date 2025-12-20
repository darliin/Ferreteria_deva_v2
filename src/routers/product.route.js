import {
    getProducts,
    GetByIdProduct,
    UpdateProduct,
    deleteProduct,
    getProductsByCategory,
    createProduct
} from "../controllers/product.controller.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/products-get", getProducts);
productRouter.post("/products-create", createProduct);
productRouter.get("/products/:id", GetByIdProduct);
productRouter.get("/products/category/:categoryId", getProductsByCategory);
productRouter.put("/products-update/:id", UpdateProduct);
productRouter.delete("/products/:id", deleteProduct);


export default productRouter;  