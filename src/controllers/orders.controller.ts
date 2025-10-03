import { Request, Response } from "express";
import {
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  createOrder,
} from "../services/order.service";
import{db} from "../db/client";
export async function getOrdersController(req: Request, res: Response) {
  try {
    const orders = await getAllOrders();
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: (error as Error).message,
    });
  }
}

export async function getOrderByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const order = await getOrderById(Number(id));

    if (!order || order.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: (error as Error).message,
    });
  }
}

export async function createOrderController(req: Request, res: Response) {
  try {
    const { user_id, product_id, quantity, total_price, status } = req.body;

    const newOrder = await createOrder({
      user_id,
      product_id,
      quantity,
      total_price,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: (error as Error).message,
    });
  }
}

export async function deleteOrderController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteOrder(Number(id));

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting order",
      error: (error as Error).message,
    });
  }
}

export async function updateOrderController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { user_id, product_id, quantity, total_price, status } = req.body;

    let updatedData: { user_id?: number; product_id?: number; quantity?: number; total_price?: number } = {};
    if (user_id) updatedData.user_id = user_id;
    if (product_id) updatedData.product_id = product_id;
    if (quantity) updatedData.quantity = quantity;
    if (total_price) updatedData.total_price = total_price;

    const result = await updateOrder(Number(id), updatedData);

    res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating order",
      error: (error as Error).message,
    });
  }
}
