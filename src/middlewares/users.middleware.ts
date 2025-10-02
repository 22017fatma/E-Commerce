import { Request, Response, NextFunction } from "express";
import { ROLES } from "../types";

export function authorizeUserOrAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = res.locals.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: no user in context",
      });
    }

    const targetId = +req.params.id;
    console.log("user id", targetId);

    if (user.role === ROLES.ADMIN) {
      return next();
    }

    if (Number(user.id) === targetId) {
      return next();
    }

    return res.status(403).json({
      success: false,
      message: "Forbidden: you cannot modify or delete this account",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Authorization check failed",
      error: (error as Error).message,
    });
  }
}
