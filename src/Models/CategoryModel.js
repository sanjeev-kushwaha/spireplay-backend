import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  description: { type: String, required: true },
  deleted: { type: Boolean, default: false },
});

export const CategoryModel = mongoose.model("Category", categorySchema);
