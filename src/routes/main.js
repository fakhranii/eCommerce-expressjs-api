import categoryRoute from "./categoryRoute.js";
import reviewRoute from "./reviewRoute.js";
import subCategoryRoute from "./subCategoryRoute.js";
import brandRoute from "./brandRoute.js";
import productRoute from "./productRoute.js";
import userRoute from "./userRoute.js";
import authRoute from "./authRoute.js";
import addressRoute from "./addressesRoute.js";
import wishlistRouter from "./wishlistRoute.js";
import couponsRoute from "./couponRoute.js";
import cartRoute from "./cartRoute.js";
import orderRoute from "./orderRoute.js";

const mountRoutes = (app) => {
  // Mount Routes
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/reviews", reviewRoute);
  app.use("/api/v1/categories", categoryRoute);
  app.use("/api/v1/subcategories", subCategoryRoute);
  app.use("/api/v1/brands", brandRoute);
  app.use("/api/v1/products", productRoute);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/wishlist", wishlistRouter);
  app.use("/api/v1/addresses", addressRoute);
  app.use("/api/v1/coupons", couponsRoute);
  app.use("/api/v1/cart", cartRoute);
  app.use("/api/v1/orders", orderRoute);
};

export default mountRoutes;
