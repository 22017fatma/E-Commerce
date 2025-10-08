import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createCreditCardController,
  deleteCreditCardController,
  getCreditCardByIdController,
  getCreditCardsController,
  updateCreditCardController,
} from "../controllers/credit_card.controller";
import { ROLES } from "../types";

const creditCardRouter = Router();

creditCardRouter.use(withAuth(ROLES.USER));

creditCardRouter.get("/", getCreditCardsController);
creditCardRouter.get("/:id", getCreditCardByIdController);
creditCardRouter.post("/", createCreditCardController);
creditCardRouter.delete("/:id", deleteCreditCardController);
creditCardRouter.put("/:id", updateCreditCardController);

export default creditCardRouter;
