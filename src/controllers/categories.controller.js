import categoryModels from "../models/category.models.js";

export const getByIdCategories = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const category = await categoryModels.findById(id);

    if (!category || !category.isActive) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo categoría" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModels.find({ isActive: true });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo categorías" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Todos los campos son obligatorios" });
    }

    const exist = await categoryModels.findOne({ name });
    if (exist) {
      return res.status(409).json({ message: "La categoría ya existe" });
    }

    const newCategory = new categoryModels({ name, description });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creando categoría" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const category = await categoryModels.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    category.isActive = false;
    await category.save();

    res.status(200).json({ message: "Categoría desactivada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando categoría" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const category = await categoryModels.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    if (name) category.name = name;
    if (description) category.description = description;
    if (typeof isActive === "boolean") category.isActive = isActive;

    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando categoría" });
  }
};
