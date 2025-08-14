import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../Controllers/CategoryController.js";

const router = express.Router();

// Get all categories
router.get("/category", getAllCategories);

//Get category by id
router.get("/category/:id", getCategoryById);

//Create category
router.post("/category", createCategory);

// Update category
router.put("/category/:id", updateCategory);

// Soft     delete category
router.delete("/category/:id", deleteCategory);

export default router;
