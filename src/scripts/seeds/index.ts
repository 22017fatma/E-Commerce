import { seedUsers } from "./users";
import { seedProducts } from "./products";
import { seedCategories } from "./categories";
import { seedProductCategories } from "./product_categories";
import { seedAddresses } from "./addresses";
import { seedCarts } from "./carts";
import { seedCartItems } from "./cart_items";
export const seedAll = async () => {
  try {
    await seedUsers();
    await seedProducts();
    await seedCategories();
    await seedProductCategories();
    await seedAddresses();
    await seedCarts();
    await seedCartItems();
    console.log("Seeding done");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed data:", error);
    process.exit(1);
  }
};

await seedAll();
