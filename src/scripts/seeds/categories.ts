import { db } from "../../db/client";
import { categories } from "../../models/schema";

export async function seedCategories() {
  
    const response = await fetch( "https://fakestoreapi.com/products/categories");
    const data: string[] = await response.json();

    const categoriesArray = data.map((name) => ({
      name,
    }));

    await db.insert(categories).values(categoriesArray);

    console.log("Categories seeded successfully");
 
    };
