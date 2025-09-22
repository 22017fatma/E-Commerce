import { Request, Response } from "express";
import { verifyUserPassword } from "../services/auth.service";
import jwt from "jsonwebtoken";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }

    const user = await verifyUserPassword(email, password);

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "2h" }
    );
    return res.json({ token, user });

  } catch (err: any) {
    if (err?.status)
      return res.status(err.status).json({ message: err.message });
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
