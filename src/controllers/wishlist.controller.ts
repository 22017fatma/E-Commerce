import { Request, Response } from "express";
import {
  getAllWishlists,
  getWishlistById,
  createWishlist,
  deleteWishlist,
  updateWishlist,
}from "../services/wishlist.service";

export async function getWishlistsController(req: Request, res: Response) {
  try {
    const wishlists = await getAllWishlists();
    res.status(200).json({
      success: true,
      data: wishlists,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching wishlists",
      error: (error as Error).message,
    });
  }
}


export async function getWishlistByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const wishlist = await getWishlistById(+id);
    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching wishlist",
      error: (error as Error).message,
    });
  }
}

export async function createWishlistController(req: Request, res: Response) {
  try {
    const { user_id, product_id } = req.body;
    const newWishlist = await createWishlist({ user_id, product_id });
    res.status(201).json({
      success: true,
      message: "Wishlist created successfully",
      data: newWishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating wishlist",
      error: (error as Error).message,
    });
  }
}

export async function deleteWishlistController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteWishlist(Number(id));
    res.status(200).json({
      success: true,
      message: "Wishlist deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting wishlist",
      error: (error as Error).message,
    });
  }
}

export async function updateWishlistController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { user_id, product_id } = req.body;
    let updatedData: { user_id?: number; product_id?: number } = {};
    if (user_id) updatedData.user_id = user_id;
    if (product_id) updatedData.product_id = product_id;
    const result = await updateWishlist(Number(id), updatedData);
    res.status(200).json({
      success: true,
      message: "Wishlist updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating wishlist",
      error: (error as Error).message,
    });
  }
} 