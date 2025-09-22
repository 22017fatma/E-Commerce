import express from "express";
import { authRoutes } from "./routes/auth.route";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("E-Commerce API is running...");
});
export { app };
