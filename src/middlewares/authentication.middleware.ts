import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ messsage: "Authentication required" });
  }

  try {
    if (accessToken) {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET_ACCESS!
      ) as typeof res.locals.user;

      res.locals.user = decoded;
      return next();
    }
  } catch (err) {
    console.warn("Access token invalid or expired");
  }
  try {
    if (refreshToken) {
      const decodedRefresh = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH!
      ) as typeof res.locals.user;

      const newAccessToken = jwt.sign(
        {
          userId: decodedRefresh.id,
          email: decodedRefresh.email,
          type: "access",
        },
        process.env.JWT_SECRET_ACCESS!,
        { expiresIn: "2h" }
      );

      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 60 * 60 * 1000,
      });

      res.locals.user = decodedRefresh;
      return next();
    }
  } catch {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  return res.status(401).json({ message: "Unauthorized" });
};
