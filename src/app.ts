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
app.use("/users", userRoutes);
app.use("/products", productsRouter);
app.use("/categories", catogryRouter);
app.use("/wishlists", wishlistRouter);
app.use("/credit_cards", creditCardRouter);
app.use("/orders", orderRouter);
app.use("/cart_items", cart_itemRouter);
app.use("/order_items", orderItemRouter);
app.use("/product_catogry", productCategoryRouter);
app.use("/product_img", productImgRouter);


app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("E-Commerce API is running...");
});
export { app };
