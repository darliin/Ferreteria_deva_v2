import mongoose from "mongoose";
import productModels from "../models/product.models.js";

export const getProducts = async (req, res) => {
    try {
        const products = await productModels.find();
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
        console.log("Products retrieved successfully");
    } catch (error) {
        console.error("Error retrieving products:", error);
    }
};

export const GetByIdProduct = async (req, res) => {
try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await productModels.findById(id);
    if (!product) {
    return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);

} catch (error) {

    return res.status(500).json({
    message: "Error retrieving product",
    error: error.message
    });
}
};

export const UpdateProduct = async (req, res) => {
try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await productModels.findByIdAndUpdate(
    id, req.body,
    {
        new: true,          
        runValidators: true 
    }
    );
    if (!product) {
    return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json(product);
} catch (error) {
    return res.status(500).json({
    message: "Error updating product",
    error: error.message
    });
}
};

export const deleteProduct = async (req, res) => {
try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await productModels.findByIdAndDelete(id);
    if (!product) {
    return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });

} catch (error) {
    return res.status(500).json({
    message: "Error deleting product",
    error: error.message
    });
}
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;

        // Validar ObjectId
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID" });
        }

        const products = await productModels.find({ 
            category: categoryId,
            isActive: true
        })
        .populate("category")
        .populate("brand");

        if (products.length === 0) {
            return res.status(404).json({ message: "No products found in this category" });
        }

        res.status(200).json(products);

    } catch (error) {
        res.status(500).json({
            message: "Error retrieving products by category",
            error: error.message
        });
    }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      brand,
      stock,
      Images
    } = req.body;

    // Validaciones
    if (
      !name ||
      !description ||
      price === undefined ||
      !category ||
      !brand ||
      stock === undefined ||
      !Images
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // Crear producto
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      Images,
      isActive: true
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error creating product"
    });
  }
};