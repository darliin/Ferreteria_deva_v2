import {
  getAllUnits,
  createUnits,
  deleteUnits,
} from "../controllers/units.controller.js";
import { Router } from "express";

const UnitsRouter = Router();

UnitsRouter.get("/getAll", getAllUnits);
UnitsRouter.post("/Create", createUnits);
UnitsRouter.delete("/deleteId/:id", deleteUnits);

export default UnitsRouter;
