import { Request, Response } from "express";
import { UserService } from "../services/users.service";

const userService = new UserService();

export const getAllUsers = async (req: Request, res: Response) => {
  const result = await userService.getAllUsers();
  res.json(result);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const result = await userService.createUser({ name, email, password });
  res.status(201).json(result);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await userService.deleteUser(Number(id));
  res.status(204).send();
};
