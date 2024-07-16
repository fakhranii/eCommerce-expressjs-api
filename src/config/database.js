import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = () => {
  connect(process.env.DB_URI).then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  });
};

export default db;
