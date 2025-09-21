import { seedUser } from "./users";
import { seedProducts } from "./products";
import { seedCategories } from "./categories";
import { seedProductCategories } from "./product_categories";

export const seedAll = async () => {
  try {
    await seedUser(10);
    await seedProducts();
    await seedCategories();
    await seedProductCategories();
    console.log("Seeding done");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed data:", error);
    process.exit(1);
  }

};

await seedAll();
