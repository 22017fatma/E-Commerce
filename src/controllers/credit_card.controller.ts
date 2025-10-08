import { Response, Request } from "express";
import {
  getAllCreditCards,
  getCreditCardById,
  createCreditCard,
  deleteCreditCard,
  updateCreditCard,
} from "../services/credit_card.service";

export async function getCreditCardsController(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const creditCards = await getAllCreditCards(user.role,+user.id);
    res.status(200).json({
      success: true,
      data: creditCards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching credit cards",
      error: (error as Error).message,
    });
  }
}

export async function getCreditCardByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const creditCard = await getCreditCardById(+id);
    res.status(200).json({
      success: true,
      data: creditCard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching credit card by id",
      error: (error as Error).message,
    });
  }
}

export async function createCreditCardController(req: Request, res: Response) {
  try {
    const { user_id, card_number, expire_date, type } = req.body;
    const CreditCard = await createCreditCard({
      user_id,
      card_number,
      expire_date,
      type,
    });
    
    res.status(201).json({
      success: true,
      data:CreditCard,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating credit card",
      error: (error as Error).message,
    });
  }
}

export async function deleteCreditCardController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { user } = res.locals;
    await deleteCreditCard(+id,+user.id);
    res.status(200).json({
      success: true,
      message: "Credit card deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting credit card",
      error: (error as Error).message,
    });
  }
}

export async function updateCreditCardController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { user } = res.locals;
    const { user_id, card_number, expire_date, type } = req.body;
    const creditCard = await updateCreditCard(+id,+user.id, {
      user_id,
      card_number,
      expire_date,
      type,
    });
   res.status(200).json({
      success: true,
      message: "Credit card updated successfully",
      data: creditCard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating credit card",
      error: (error as Error).message,
    });
  }
}
