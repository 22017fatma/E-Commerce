import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
} from "../services/users.service";

export async function getAllUsersController(req: Request, res: Response) {
  try {
    const users = await getAllUsers();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
}

export async function getUserByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await getUserById(Number(id));

    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
}

export async function createUserController(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const result = await createUser({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { user } = res.locals;
    await deleteUser(+id,+user.id);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
}

export async function updateUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { user } = res.locals;
    const { name, email, password } = req.body;

    let updatedData: { name?: string; email?: string; password?: string } = {};
    if (name) updatedData.name = name;
    if (email) updatedData.email = email;
    if (password) {
      updatedData.password = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS)
      );
    }

    const result = await updateUser(+id,+user.id, updatedData);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: (error as Error).message,
    });
  }
}
