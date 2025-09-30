import { Router, Request, Response } from "express";
import { login } from "../controllers/auth.controller";
import { withAuth } from "../middlewares/auth";

const authRoutes = Router();

authRoutes.post("/login", login);

authRoutes.get("/admin", withAuth("admin"), (req: Request, res: Response) => {
  res.json({ message: "Welcome Admin" });
});


authRoutes.get( "/user", withAuth("user", "admin"), (req: Request, res: Response) => {
    res.json({ message: "Welcome User" });
  }
);

export default authRoutes;
