import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        ref: "Category",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    brand:
    {
        ref: "Brand",
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    Images: [{
        type: String
    }]

});

export default mongoose.model("Product", productSchema);