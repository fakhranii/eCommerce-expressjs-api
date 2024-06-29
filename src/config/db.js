import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = mongoose
  .connect(process.env.DB_URI)
  .then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  })
  // .catch((err) => {
  //   console.error(`Database Error: ${err}`);
  //   process.exit(1);
  // });
export default db;
