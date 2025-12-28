import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRouter from "./src/routes/users.route.js";
import productRouter from "./src/routes/products.route.js";
import CategoriesRouter from "./src/routes/categories.route.js";
import UnitsRouter from "./src/routes/units.route.js";
import brandsRouter from "./src/routes/brands.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/users", userRouter);
app.use("/api/categories", CategoriesRouter);
app.use("/api/units", UnitsRouter);
app.use("/api/products", productRouter);
app.use("/api/brands", brandsRouter);

app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
