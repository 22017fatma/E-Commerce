import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import productsRouter from "./routes/products.route";
import userRoutes from "./routes/user.route";
import orderRouter from "./routes/order.route";
import catogryRouter from "./routes/category.route";
import wishlistRouter from "./routes/wishlist.route";
import creditCardRouter from "./routes/credit_card.route";
import adminRouter from "./routes/admin.route";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productsRouter);
app.use("/categories", catogryRouter);
app.use("/wishlists", wishlistRouter);
app.use("/credit_cards", creditCardRouter);
app.use("/orders", orderRouter);

app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("E-Commerce API is running...");
});
export { app };
