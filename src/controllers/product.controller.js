import mongoose from "mongoose";
import Product from "../models/product.models.js";
import Category from "../models/category.models.js";
import Brand from "../models/brand.models.js";
import Supplier from "../models/supplier.models.js";
import Unit from "../models/unit.models.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate("category", "name")
      .populate("brand", "name")
      .populate("supplier", "name")
      .populate("unit", "name shortName");

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const product = await Product.findById(id).populate(
      "category brand supplier unit"
    );

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo producto" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      code,
      description,
      price,
      costPrice,
      unit,
      category,
      brand,
      supplier,
      stock,
      minStock,
      images,
    } = req.body;

    if (
      !name ||
      !code ||
      !description ||
      !price ||
      !costPrice ||
      !unit ||
      !category ||
      !brand ||
      !supplier ||
      stock === undefined
    ) {
      return res.status(400).json({ message: "Campos obligatorios faltantes" });
    }

    if (price <= costPrice) {
      return res.status(400).json({
        message: "El precio de venta debe ser mayor al precio de compra",
      });
    }

    const existCode = await Product.findOne({ code });
    if (existCode) {
      return res
        .status(409)
        .json({ message: "El código del producto ya existe" });
    }

    const [cat, br, sup, un] = await Promise.all([
      Category.findById(category),
      Brand.findById(brand),
      Supplier.findById(supplier),
      Unit.findById(unit),
    ]);

    if (!cat || !cat.isActive)
      return res.status(400).json({ message: "Categoría inválida" });
    if (!br) return res.status(400).json({ message: "Marca inválida" });
    if (!sup) return res.status(400).json({ message: "Proveedor inválido" });
    if (!un || !un.isActive)
      return res.status(400).json({ message: "Unidad inválida" });

    const newProduct = new Product({
      name,
      code,
      description,
      price,
      costPrice,
      unit,
      category,
      brand,
      supplier,
      stock,
      minStock,
      images,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creando producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    if (data.price && data.costPrice && data.price <= data.costPrice) {
      return res.status(400).json({
        message: "El precio de venta debe ser mayor al precio de compra",
      });
    }

    Object.assign(product, data);
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.isActive = false;
    await product.save();

    res.status(200).json({ message: "Producto desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando producto" });
  }
};
