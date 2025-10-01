import { Request, Response } from "express";
import { getAllProducts } from "../services/product.service";

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
}
