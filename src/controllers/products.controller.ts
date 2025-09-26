import { Request, Response } from "express";
import { seedProducts } from "../scripts/seeds/products";

export async function seedProductsController(req: Request, res: Response) {
  try {
    await seedProducts();
    return res
      .status(200)
      .json({ message: "Products + images seeded successfully" });
  } catch (error: any) {
    console.error("Error seeding products:", error);
    return res.status(500).json({ error: "Failed to seed products" });
  }
}
