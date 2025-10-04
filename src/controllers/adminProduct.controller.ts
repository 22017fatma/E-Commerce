import { Request, Response } from "express";
import {
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addProduct,
} from "../services/product.service";

export async function getProductsController(
  req: Request<{}, {}, {}, ProductFilters>,
  res: Response
) {
  try {
    const products = await getAllProducts(req.query);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetch products",
      error: (error as Error).message,
    });
  }
};

export async function getProductByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await getProductById(Number(id));

    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: (error as Error).message,
    });
  }
}

export async function addProductController(req: Request, res: Response) {
  const { name, price, stock } = req.body;
  const newProduct = await addProduct(name, price, stock);
  res.status(201).json({
    success: true,
    message: "Product added successfully",
    data: newProduct,
  });     
};

export async function updateProductController(req: Request, res: Response) {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  if (name === undefined || price === undefined || stock === undefined) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields",
    });
  }
  const updatedProduct = await updateProduct(Number(id), name, price, stock);
  if (!updatedProduct) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
};
  
export async function deleteProductController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteProduct(Number(id));
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting product",
      error: (error as Error).message,
    });
  }
};
