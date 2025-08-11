import * as CategoryService from "../Services/CategoryService.js"

/**
 * GET /categories
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.getAll();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * GET /categories/:id
 */
export const getCategoryById = async (req, res) => {
  try {
    const category = await CategoryService.single(req.params.id);
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

/**
 * POST /categories
 */
export const createCategory = async (req, res) => {
  try {
    const newCategory = await CategoryService.create(req.body);
    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * PUT /categories/:id
 */
export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await CategoryService.update(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};


/**
 * DELETE /categories/:id
 */
export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await CategoryService.deleteCategory(req.params.id);
    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
