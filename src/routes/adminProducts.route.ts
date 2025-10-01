import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import { addProductController, deleteProductController } from "../controllers/adminProduct.controller";
import { ROLES } from "../types";

const adminRouter = Router();

adminRouter.use(withAuth(ROLES.ADMIN));
adminRouter.post("/", addProductController);
adminRouter.delete("/:id", deleteProductController);


export default adminRouter;