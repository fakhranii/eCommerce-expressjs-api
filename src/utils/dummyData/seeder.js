import colors from "colors";
import fs from "fs";
import db from "../../config/database.js";
import dotenv from "dotenv";
import { connect } from "mongoose";
import ProductModel from "../../models/productModel.js";
dotenv.config({ path: "../../../.env" });

console.log(`db from db file ${process.env.DB_URI}`);

db();

// Read data
const products = JSON.parse(fs.readFileSync("./products.json"));

// Insert data into DB
const insertData = async () => {
  try {
    await ProductModel.create(products);

    console.log("Data Inserted".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await ProductModel.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
