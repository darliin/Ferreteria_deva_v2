import express from "express";
import {
  getSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/suppliers.controller.js";

const supliersRouter = express.Router();

supliersRouter.post("/create", createSupplier);
supliersRouter.get("/GetAll", getSuppliers);
supliersRouter.get("/getById/:id", getSupplierById);
supliersRouter.put("/update/:id", updateSupplier);
supliersRouter.delete("/delete/:id", deleteSupplier);

export default supliersRouter;
