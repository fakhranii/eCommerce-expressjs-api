import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import  db  from "./config/db.js";
import categoryRoute from "./routes/categoryRoute.js";
dotenv.config();

// express app
const app = express();

//? Always we use middlewares before Routes
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev")); //* when we need to trigger a middleware we use (app.use(middleware))
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);

app.listen(process.env.PORT, () => {
  console.log(
    `App running on port ${process.env.PORT} on ${process.env.NODE_ENV} mode `
  );
});
