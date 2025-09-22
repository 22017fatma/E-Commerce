import express from "express";
import { login } from "../controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/login", login);

export { authRoutes };
