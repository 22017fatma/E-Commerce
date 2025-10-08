import { Request, Response } from "express";
import {
  getAllCarts,
  getCartById,
  createCart,
  deleteCart,
  updateCart,
} from "../services/cart.service";

export async function getCartsController(req: Request, res: Response) {
  try {
    const { user } = res.locals;
    const carts = await getAllCarts(user.role, +user.id);
    res.status(200).json({
      success: true,
      data: carts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching carts",
      error: (error as Error).message,
    });
  }
}

export async function getCartByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const cart = await getCartById(+id);
    res.status(200).json({
      success: true,
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart",
      error: (error as Error).message,
    });
  }
}

export async function createCartController(req: Request, res: Response) {
  try {
    const { user_id } = req.body;
    const newCart = await createCart({ user_id });
    res.status(201).json({
      success: true,
      message: "Cart created successfully",
      data: newCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating cart",
      error: (error as Error).message,
    });
  }
}

export async function deleteCartController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { user } = res.locals;
    await deleteCart(+id, +user.id);
    res.status(200).json({
      success: true,
      message: "Cart deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting cart",
      error: (error as Error).message,
    });
  }
}

export async function updateCartController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { user } = res.locals;
    const { user_id } = req.body;
    let updatedData: { user_id?: number } = {};
    if (user_id) updatedData.user_id = user_id;
    const result = await updateCart(+id, +user.id, updatedData);
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart",
      error: (error as Error).message,
    });
  }
}
