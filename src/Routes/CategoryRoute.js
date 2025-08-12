import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../Controllers/CategoryController.js";


const router = express.Router();

// Get all categories
router.get("/", getAllCategories);

//Get category by id
router.get("/:id", getCategoryById)

//Create category
router.post("/", createCategory)

// Update category
router.put("/:id",updateCategory);

// Soft     delete category
router.delete("/:id", deleteCategory);


export default router;
