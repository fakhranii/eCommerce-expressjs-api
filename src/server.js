import * as path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import mongoSanitize from "express-mongo-sanitize";

import db from "./config/database.js";
import { ApiError } from "./utils/classes/apiError.js";
import { globalErrorHandler } from "./middlewares/errorMiddleware.js";
import mountRoutes from "./routes/main.js";
import { webhookCheckout } from "./services/orderService.js";
import sanitizeHtmlData from "./utils/sanitizeHtmlData.js";
dotenv.config();

// DB connection
db();

// express app
const app = express();

// enable other domains to access the your apis
app.use(cors());
app.options("*", cors());

// compress all responses that make it light & faster
app.use(compression());

// Checkout webhook
app.post(
  "/webhook-checkout",
  express.raw({ type: "application/json" }),
  webhookCheckout
);

//? Always we use middlewares before Routes
app.use(express.json({ limit: "10kb" }));
app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //* when we need to trigger a middleware we use (app.use(middleware))
}

// apply data sanitize to avoid sql injection & cross site scripting
app.use(mongoSanitize()); // avoid nosql injection
app.use(sanitizeHtmlData); // treat html scripts as normal strings

// limit each ip to 100 req per window in (windowMs) time
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

app.use("/api", limiter);

// Middleware to protect against HTTP Parameter Pollution attacks
// make sure to use it after express.JSON()
app.use(
  hpp({
    // in case if I wanna hpp doesn't work with some parameters , write them here
    whitelist: [
      "price",
      "sold",
      "quantity",
      "ratingsAverage",
      "ratingsQuantity",
    ],
  })
);

// Mount All the Routes
mountRoutes(app);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware
app.use(globalErrorHandler);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `App running on port ${process.env.PORT} on ${process.env.NODE_ENV} mode`
  );
});

// to handle all errors outside express
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shuting down....`);
    process.exit(1); // exit from the application after closing the server becase if i had pending requests , i finished it first then close the server
  });
});
