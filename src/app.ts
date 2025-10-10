import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import productsRouter from "./routes/products.route";
import userRoutes from "./routes/user.route";
import orderRouter from "./routes/order.route";
import catogryRouter from "./routes/category.route";
import wishlistRouter from "./routes/wishlist.route";
import creditCardRouter from "./routes/credit_card.route";
import cart_itemRouter from "./routes/cart_item.route";
import orderItemRouter from "./routes/order_item.route";
import productCategoryRouter from "./routes/product_category.route";
import productImgRouter from "./routes/product_img.route";
import adminRouter from "./routes/admin.route";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

app.use("/user/users", userRoutes);
app.use("/user/products", productsRouter);
app.use("/user/categories", catogryRouter);
app.use("/user/wishlists", wishlistRouter);
app.use("/user/credit_cards", creditCardRouter);
app.use("/user/orders", orderRouter);
app.use("/user/cart_items", cart_itemRouter);
app.use("/user/order_items", orderItemRouter);
app.use("/user/product_catogry", productCategoryRouter);
app.use("/user/product_img", productImgRouter);

app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("E-Commerce API is running...");
});
export { app };
