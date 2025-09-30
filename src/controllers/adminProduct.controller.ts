import { Request, Response } from "express";
import { db } from "../db/client";
import { products } from "../models/schema";
import { eq } from "drizzle-orm";

export async function addProductController(req: Request, res: Response) {
  try {
    const { name, price, stock } = req.body;

    const newProduct = await db.insert(products).values({
      name,
      price,
      stock,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding product",
      error: (error as Error).message,
    });
  }
}

export async function deleteProductController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await db.delete(products).where(eq(products.id, Number(id)));

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
}
