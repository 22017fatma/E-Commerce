import { Router } from "express";
import { withAuth } from "../middlewares/auth";
import {
  createCreditCardController,
  deleteCreditCardController,
  getCreditCardByIdController,
  getCreditCardsController,
  updateCreditCardController,
} from "../controllers/credit_card.controller";
import { authorizeUserOrAdmin } from "../middlewares/users.middleware";
import { ROLES } from "../types";

const creditCardRouter = Router();

creditCardRouter.use(withAuth(ROLES.USER));

creditCardRouter.get("/", authorizeUserOrAdmin, getCreditCardsController);
creditCardRouter.get("/:id", authorizeUserOrAdmin, getCreditCardByIdController);
creditCardRouter.post("/", authorizeUserOrAdmin, createCreditCardController);
creditCardRouter.delete("/:id", authorizeUserOrAdmin, deleteCreditCardController);
creditCardRouter.put("/:id", authorizeUserOrAdmin, updateCreditCardController);

export default creditCardRouter;