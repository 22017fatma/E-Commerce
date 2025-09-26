import { Router } from "express";
import { seedProductsController } from "../controllers/products.controller";
const productsRouter = Router();

productsRouter.post("/products", seedProductsController);


export default productsRouter;
