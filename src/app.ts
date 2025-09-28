import express from "express";
import authRoutes from "./routes/auth.route";
import productsRouter from "./routes/products.route";
import cookieParser from "cookie-parser";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/products", productsRouter);

app.get("/", (req, res) => {
  res.send("E-Commerce API is running...");
});
export { app };
