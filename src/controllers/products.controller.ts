import { Request, Response } from "express";
import { getAllProducts } from "../services/product.service";


export async function getProductsController(req: Request, res: Response) {
 try {
   const filters = {
     name: req.query.name as string,
     price: req.query.price ? Number(req.query.price) : undefined,
     minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
     maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
     stock: req.query.stock ? Number(req.query.stock) : undefined,
   };

   const products = await getAllProducts(filters);

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
