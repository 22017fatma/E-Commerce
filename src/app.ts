import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import productsRouter from "./routes/products.route";
import userRoutes from "./routes/user.route";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("E-Commerce API is running...");
});
export { app };
