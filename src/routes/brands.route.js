import express from "express";
import {
  createBrand,
  getBrands,
  updateBrand,
  deleteBrand,
  disableBrand,
} from "../controllers/brands.controller.js";

const brandsRouter = express.Router();

brandsRouter.get("/getAll", getBrands);
brandsRouter.post("/create", createBrand);
brandsRouter.put("/update/:id", updateBrand);
brandsRouter.delete("/disableBrand/:id", disableBrand);
brandsRouter.delete("/delete/:id", deleteBrand);

export default brandsRouter;
