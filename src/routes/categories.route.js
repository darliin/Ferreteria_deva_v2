import express from "express";
import {
  getByIdCategories,
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/categories.controller.js";
import Authentication from "../middlewares/auth.js";

const CategoriesRouter = express.Router();

CategoriesRouter.get("/categories/:id", Authentication, getByIdCategories);
CategoriesRouter.get("/GetAll", Authentication, getAllCategories);
CategoriesRouter.post("/create", Authentication, createCategory);
CategoriesRouter.delete("/delete/:id", Authentication, deleteCategory);
CategoriesRouter.put("/update/:id", Authentication, updateCategory);

export default CategoriesRouter;
