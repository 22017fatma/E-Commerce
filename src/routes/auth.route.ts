import { Router, Request, Response } from "express";
import { login } from "../controllers/auth.controller";
import { withAuth } from "../middlewares/auth";
import { ROLES } from "../types";

const authRoutes = Router();

authRoutes.post("/login", login);

authRoutes.get("/admin", withAuth(ROLES.ADMIN), (req: Request, res: Response) => {
  res.json({ message: "Welcome Admin" });
});


authRoutes.get( "/user", withAuth(ROLES.USER), (req: Request, res: Response) => {
    res.json({ message: "Welcome User" });
  }
);

export default authRoutes;
