import express from "express";
import {
  getByIdCategories,
  getAllCategories,
  createCategory,
  deleteCategory,
  disableCategory,
  updateCategory,
} from "../controllers/categories.controller.js";
import Authentication from "../middlewares/auth.js";

const CategoriesRouter = express.Router();

CategoriesRouter.get("/getId/:id", Authentication, getByIdCategories);
CategoriesRouter.get("/GetAll", Authentication, getAllCategories);
CategoriesRouter.post("/create", Authentication, createCategory);
CategoriesRouter.delete("/disable/:id", Authentication, disableCategory);
CategoriesRouter.put("/update/:id", Authentication, updateCategory);
CategoriesRouter.delete("/delete/:id", Authentication, deleteCategory);

export default CategoriesRouter;
