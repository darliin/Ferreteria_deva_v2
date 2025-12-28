import Brand from "../models/brand.models.js";
import mongoose from "mongoose";

export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find({ isActive: true });
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo marcas" });
  }
};

export const createBrand = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Campo obligatorio faltante" });
    }

    const exist = await Brand.findOne({ name });
    if (exist) {
      return res.status(409).json({ message: "La marca ya existe" });
    }

    const brand = new Brand({
      name,
      imageUrl,
    });

    await brand.save();
    res.status(201).json(brand);
  } catch (error) {
    res.status(500).json({ message: "Error creando marca" });
  }
};

export const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageUrl, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }

    if (name) brand.name = name;
    if (imageUrl) brand.imageUrl = imageUrl;
    if (typeof isActive === "boolean") brand.isActive = isActive;

    await brand.save();
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando marca" });
  }
};

export const disableBrand = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }

    brand.isActive = false;
    await brand.save();

    res.status(200).json({ message: "Marca desactivada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando marca" });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).json({ message: "Marca no encontrada" });
    }
    res.status(200).json({ message: "Marca eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando marca" });
  }
};
