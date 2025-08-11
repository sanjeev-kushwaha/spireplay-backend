import { CategoryModel as Model } from "../Models/CategoryModel.js";

export const getAll = async () => {
  try {
    const data = await Model.find({ deleted: false });
    return data;
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
};

export const single = async (id) => {
  try {
    const data = await Model.findOne({ _id: id, deleted: false });
    if (!data) {
      throw new Error("Category not found");
    }
    return data;
  } catch (error) {
    throw new Error("Error fetching category: " + error.message);
  }
};

export const create = async (categoryData) => {
  try {
    const newCategory = new Model(categoryData);
    await newCategory.save();
    return newCategory;
  } catch (error) {
    throw new Error("Error creating category: " + error.message);
  }
};

export const update = async (id, categoryData) => {
  try {
    const category = await Model.findOne({ _id: id, deleted: false });
  if (!category) {
    throw new Error("Category not found or has been deleted");
  }
    const updatedCategory = await Model.findByIdAndUpdate(id, categoryData, {
      new: true,
      runValidators: true,
    });
    if (!updatedCategory) {
      throw new Error("Category not found");
    }
    return updatedCategory;
  } catch (error) {
    throw new Error("Error updating category: " + error.message);
  }
};

export const deleteCategory = async (id) => {
  try {
    const deletedCategory = await Model.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
    if (!deletedCategory) {
      throw new Error("Category not found");
    }
    return deletedCategory;
  } catch (error) {
    throw new Error("Error deleting category: " + error.message);
  }
};
