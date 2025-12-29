import Supplier from "../models/supplier.models.js";

export const createSupplier = async (req, res) => {
  try {
    const { name, rnc, phone, email, isActive } = req.body;

    const supplier = new Supplier({
      name,
      rnc,
      phone,
      email,
      isActive,
    });

    await supplier.save();

    res.status(201).json({
      message: "Proveedor creado correctamente",
      supplier,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { name, rnc, phone, email, isActive } = req.body;

    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        name,
        rnc,
        phone,
        email,
        isActive,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!supplier) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json({
      message: "Proveedor actualizado correctamente",
      supplier,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!supplier) {
      return res.status(404).json({ message: "Proveedor no encontrado" });
    }

    res.json({
      message: "Proveedor desactivado correctamente",
      supplier,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
