import { Request, Response } from "express";
import {
  createProductImage,
  deleteProductImage,
  getAllProductImages,
  getProductImageById,
  updateProductImage,
} from "../services/product_img.service";

export async function getProductImagesController(req: Request, res: Response) {
  try {
    const productImages = await getAllProductImages();
    res.status(200).json({
      success: true,
      data: productImages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product images",
      error: (error as Error).message,
    });
  }
}

export async function getProductImageByIdController( req: Request,res: Response) {
  try {
    const { id } = req.params;
    const productImage = await getProductImageById(+id);
    res.status(200).json({
      success: true,
      data: productImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product image",
      error: (error as Error).message,
    });
  }
}

export async function createProductImageController(req: Request,res: Response) {
  try {
    const { product_id, url } = req.body;
    const newProductImage = await createProductImage({
      product_id,
      url,
    });
    res.status(201).json({
      success: true,
      message: "Product image created successfully",
      data: newProductImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product image",
      error: (error as Error).message,
    });
  }
}

export async function deleteProductImageController( req: Request,res: Response) {
  try {
    const { id } = req.params;
    await deleteProductImage(+id);
    res.status(200).json({
      success: true,
      message: "Product image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product image",
      error: (error as Error).message,
    });
  }
}

export async function updateProductImageController(req: Request,res: Response) {
  try {
    const { id } = req.params;
    const { product_id, url } = req.body;

    if (typeof product_id !== "number" || typeof url !== "string") {
      return res.status(400).json({
        success: false,
        message: "product_id and url are required for update.",
      });
    }

    const updatedData: { product_id: number; url: string } = {
      product_id,
      url,
    };

    const result = await updateProductImage(+id, updatedData);
    res.status(200).json({
      success: true,
      message: "Product image updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product image",
      error: (error as Error).message,
    });
  }
}
