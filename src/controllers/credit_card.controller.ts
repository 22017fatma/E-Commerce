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
    const creditCards = await getAllCreditCards();
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
    const { data } = req.body;
    const creditCard = await createCreditCard(data);
    res.status(200).json({
      success: true,
      data: creditCard,
    });
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
    await deleteCreditCard(+id);
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
    const { data } = req.body;
    const creditCard = await updateCreditCard(+id, data);
    res.status(200).json({
      success: true,
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
