import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    description: {
      type: String,
      max: 500,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    minQuantity: {
      type: Number,
    },
    reorderPoint: {
      type: Number,
    },
    maxQuantity: {
      type: Number,
    },
    supplierId: String,
    status: String,
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
