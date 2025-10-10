import { Request, Response } from "express";
import {
  createCartItem,
  deleteCartItem,
  getCartItemById,
  getAllCartItems,
  updateCartItem,
} from "../services/cart_item.service";

export async function getCartItemsController(
  req: Request<unknown, unknown, { cartId: number }>,
  res: Response
) {
  try {
    const { user } = res.locals;
    const { cartId } = req.body;
    const cartItems = await getAllCartItems(user.role, cartId, +user.id);
    res.status(200).json({
      success: true,
      data: cartItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart items",
      error: (error as Error).message,
    });
  }
}

export async function getCartItemByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const cartItem = await getCartItemById(+id);
    res.status(200).json({
      success: true,
      data: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching cart item",
      error: (error as Error).message,
    });
  }
}

export async function createCartItemController(req: Request, res: Response) {
  try {
    const { cart_id, product_id, quantity } = req.body;
    const newCartItem = await createCartItem({
      cart_id,
      product_id,
      quantity,
    });
    res.status(201).json({
      success: true,
      message: "Cart item created successfully",
      data: newCartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating cart item",
      error: (error as Error).message,
    });
  }
}

export async function deleteCartItemController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { cart_id } = req.body;
    const { user } = res.locals;
    await deleteCartItem(+id, +cart_id, +user.id);
    res.status(200).json({
      success: true,
      message: "Cart item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting cart item",
      error: (error as Error).message,
    });
  }
}

export async function updateCartItemController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { cart_id, product_id, quantity } = req.body;
    let updatedData: {
      cart_id?: number;
      product_id?: number;
      quantity?: number;
    } = {};
    if (cart_id) updatedData.cart_id = cart_id;
    if (product_id) updatedData.product_id = product_id;
    if (quantity) updatedData.quantity = quantity;
    const { user } = res.locals;
    const result = await updateCartItem(+id, +cart_id, +user.id, updatedData);
    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating cart item",
      error: (error as Error).message,
    });
  }
}
