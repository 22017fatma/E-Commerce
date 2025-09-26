import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authJWT(req: Request, res: Response, next: NextFunction) {
  // accessToken
  const token = req.cookies?.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Token missing in cookies" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }
}
