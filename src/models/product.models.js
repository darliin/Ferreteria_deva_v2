import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    costPrice: {
      type: Number,
      required: true,
    },

    unit: {
      ref: "Unit",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    category: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    brand: {
      ref: "Brand",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    supplier: {
      ref: "Supplier",
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    minStock: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
