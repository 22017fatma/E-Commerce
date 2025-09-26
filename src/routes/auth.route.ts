import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { authJWT } from "../middlewares/auth.middleware";

const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.get("/profile", authJWT, (req, res) => {
  res.json({ message: "You are authorized!", user: (req as any).user });
});

export default authRoutes;
