import Unit from "../models/unit.models.js";

export const getAllUnits = async (req, res) => {
  try {
    const units = await Unit.find({ isActive: true });
    res.status(200).json(units);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo unidades" });
  }
};

export const createUnits = async (req, res) => {
  try {
    const { name, shortName, type, description } = req.body;

    if (!name || !shortName || !type) {
      return res.status(400).json({ message: "Campos obligatorios faltantes" });
    }

    const exist = await Unit.findOne({ name });
    if (exist) {
      return res.status(409).json({ message: "La unidad ya existe" });
    }

    const unit = new Unit({ name, shortName, type, description });
    await unit.save();

    res.status(201).json(unit);
  } catch (error) {
    res.status(500).json({ message: "Error creando unidad" });
  }
};

export const deleteUnits = async (req, res) => {
  try {
    const { id } = req.params;

    const unit = await Unit.findById(id);
    if (!unit) {
      return res.status(404).json({ message: "Unidad no encontrada" });
    }

    unit.isActive = false;
    await unit.save();

    res.status(200).json({ message: "Unidad desactivada" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando unidad" });
  }
};
