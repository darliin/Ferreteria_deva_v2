import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import userRouter from "./src/routers/user.route.js";
import productRouter from "./src/routers/product.route.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", userRouter);
app.use("/api", productRouter);

app.get("/", (req, res) => {
  res.send("API running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
