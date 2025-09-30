import { Router } from "express";
import { withAuth } from "../middlewares/auth";

import { getProductsController } from "../controllers/products.controller";
import { addProductController,deleteProductController } from "../controllers/adminProduct.controller";
const productsRouter = Router();

productsRouter.get("/",withAuth("user","admin") ,getProductsController);


productsRouter.post("/", withAuth("admin"), addProductController);
productsRouter.delete("/:id", withAuth("admin"), deleteProductController);

export default productsRouter;
