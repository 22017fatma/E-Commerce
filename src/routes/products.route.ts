import { Router } from "express";
import { getProductsController } from "../controllers/products.controller";
const productsRouter = Router();

productsRouter.get("/", getProductsController);


export default productsRouter;
