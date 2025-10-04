import { Request, Response } from "express";
import {
  createAddress,
  deleteAddress,
  getAllAddresses,
  getAddressById,
  updateAddress,
} from "../services/address.service";

export async function getAddressesController(req: Request, res: Response) {
  try {
    const addresses = await getAllAddresses();
    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching addresses",
      error: (error as Error).message,
    });
  }
}

export async function getAddressByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const address = await getAddressById(+id);
    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching address",
      error: (error as Error).message,
    });
  }
}

export async function createAddressController(req: Request, res: Response) {
  try {
    const { user_id, name, street, city, is_default } = req.body;
    const newAddress = await createAddress({
      user_id,
      name,
      street,
      city,
      is_default,
    });
    res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating address",
      error: (error as Error).message,
    });
  }
}

export async function deleteAddressController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteAddress(+id);
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting address",
      error: (error as Error).message,
    });
  }
}

export async function updateAddressController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { user_id, name, street, city, is_default } = req.body;

    let updatedData: { user_id?: number; name?: string; street?: string; city?: string; is_default?: boolean } = {};
    if (user_id) updatedData.user_id = user_id;
    if (name) updatedData.name = name;
    if (street) updatedData.street = street;
    if (city) updatedData.city = city;
    if (is_default) updatedData.is_default = is_default;

    const result = await updateAddress(+id, updatedData);
    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating address",
      error: (error as Error).message,
    });
  }
} 