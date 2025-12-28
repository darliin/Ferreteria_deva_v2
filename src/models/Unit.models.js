import mongoose from "mongoose";

const unitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    shortName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
    },

    type: {
      type: String,
      enum: ["cantidad", "peso", "volumen", "longitud"],
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Unit", unitSchema);
