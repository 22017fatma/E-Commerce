import { Request, Response } from "express";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../services/category.service";

export async function getCategoriesController(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const categories = await getAllCategories(user.role, +user.id);
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching categories",
      error: (error as Error).message,
    });
  }
}

export async function getCategoryByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const category = await getCategoryById(+id);
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching category",
      error: (error as Error).message,
    });
  }
}

export async function createCategoryController(req: Request, res: Response) {
  try {
    const { name, id } = req.body;
    const newCategory = await createCategory({ name, id });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating category",
      error: (error as Error).message,
    });
  }
}
export async function deleteCategoryController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { user } = res.locals;
    await deleteCategory(Number(id),+user.id);
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting category",
      error: (error as Error).message,
    });
  }
}

export async function updateCategoryController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { user } = res.locals;  
    const { name, parent_id } = req.body;
    let updatedData: { name?: string; parent_id?: number } = {};
    if (name) updatedData.name = name;
    if (parent_id) updatedData.parent_id = parent_id;
    const result = await updateCategory(+id,+user.id, updatedData);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating category",
      error: (error as Error).message,
    });
  }
}
