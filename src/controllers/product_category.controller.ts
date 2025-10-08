import { Request, Response } from "express";
import {
  getAllProductCategories,
  getProductCategoryById,
  createProductCategory,
  deleteProductCategory,
  updateProductCategory,
} from "../services/product_category.service";

export async function getProductCategoriesController( req: Request,res: Response) {
  try {
    const { user } = res.locals;
    const productCategories = await getAllProductCategories(user.role, +user.id);
    res.status(200).json({
      success: true,
      data: productCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product categories",
      error: (error as Error).message,
    });
  }
};

export async function getProductCategoryByIdController( req: Request,res: Response) {
  try {
    const { id } = req.params;
    const productCategory = await getProductCategoryById(+id);
    res.status(200).json({
      success: true,
      data: productCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product category",
      error: (error as Error).message,
    });
  }
};

export async function createProductCategoryController( req: Request, res: Response) {
  try {
    const { name, category_id, product_id } = req.body;
    const newProductCategory = await createProductCategory({
      name,
      category_id,
      product_id,
    });
    res.status(201).json({
      success: true,
      message: "Product category created successfully",
      data: newProductCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product category",
      error: (error as Error).message,
    });
  }
}
export async function deleteProductCategoryController( req: Request, res: Response) {
  try {
    const { id } = req.params;
    const{category_id}=req.body;
    await deleteProductCategory(+id,+category_id);
    res.status(200).json({
      success: true,
      message: "Product category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product category",
      error: (error as Error).message,
    });
  }
};

export async function updateProductCategoryController( req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, category_id, product_id } = req.body;
    if (
      name === "undefined" ||
      category_id === "undefined" ||
      product_id === "undefined"
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, category_id, and product_id are required for update.",
      });
    }
    const updatedData = {
      name,
      category_id,
      product_id,
    };
    const result = await updateProductCategory(+id,category_id, updatedData);
    res.status(200).json({
      success: true,
      message: "Product category updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product category",
      error: (error as Error).message,
    });
  }
}
