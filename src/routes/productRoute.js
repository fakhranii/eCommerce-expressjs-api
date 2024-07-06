// const { Router } = require("express");
import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../services/productService.js";
import {
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
  getProductValidator, 
} from "../utils/validators/productValidator.js";
const router = Router();

router.route("/").post(createProductValidator, createProduct).get(getProducts);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);

export default router;
