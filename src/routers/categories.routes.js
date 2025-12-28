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
CategoriesRouter.get("/categories", Authentication, getAllCategories);
CategoriesRouter.post("/categories", Authentication, createCategory);
CategoriesRouter.delete("/categories/:id", Authentication, deleteCategory);
CategoriesRouter.put("/categories/:id", Authentication, updateCategory);

export default CategoriesRouter;
