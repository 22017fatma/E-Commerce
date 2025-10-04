import { Request, Response } from "express";
import {
  createOrderItem,
  deleteOrderItem,
  getOrderItemById,
  getAllOrderItems,
  updateOrderItem,
} from "../services/order_item.service";

export async function getOrderItemsController(req: Request, res: Response) {
  try {
    const orderItems = await getAllOrderItems();
    res.status(200).json({
      success: true,
      data: orderItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order items",
      error: (error as Error).message,
    });
  }
}

export async function getOrderItemByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const orderItem = await getOrderItemById(+id);
    res.status(200).json({
      success: true,
      data: orderItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order item",
      error: (error as Error).message,
    });
  }
}

export async function createOrderItemController(req: Request, res: Response) {
  try {
    const { order_id, product_id, price_at_purchase } = req.body;
    const newOrderItem = await createOrderItem({
      order_id,
      product_id,        
      price_at_purchase,
    });
    res.status(201).json({
      success: true,
      message: "Order item created successfully",
      data: newOrderItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order item",
      error: (error as Error).message,
    });
  }
}

export async function deleteOrderItemController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteOrderItem(+id);
    res.status(200).json({
      success: true,
      message: "Order item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting order item",
      error: (error as Error).message,
    });
  }
}

export async function updateOrderItemController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { order_id, product_id, price_at_purchase } = req.body;
    if (
      order_id === undefined ||
      product_id === undefined ||
      price_at_purchase === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: order_id, product_id, price_at_purchase",
      });
    }

    const updatedData = {
      order_id,
      product_id,
      price_at_purchase,
    };

    const result = await updateOrderItem(+id, updatedData);

    res.status(200).json({
      success: true,
      message: "Order item updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order item",
      error: (error as Error).message,
    });
  }
}