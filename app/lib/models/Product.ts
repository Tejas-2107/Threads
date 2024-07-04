import mongoose, { Schema } from "mongoose";
const Product = new Schema({
    title: {
        type: String,
        requeired: true
    },
    category: {
        type: String,
        requeired: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.models.FormSchema || mongoose.model("Product", Product);