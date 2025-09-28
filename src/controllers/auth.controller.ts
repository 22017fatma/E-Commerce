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

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email, type: "access" },
      process.env.JWT_SECRET_ACCESS!,
      { expiresIn: "2h" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email, type: "refresh" },
      process.env.JWT_SECRET_REFRESH!,
      { expiresIn: "7d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return res.json({ message: "Login successful", user });
  } catch (err: any) {
    if (err?.status)
      return res.status(err.status).json({ message: err.message });
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
