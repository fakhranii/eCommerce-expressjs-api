import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  resizeProductImages,
  updateProduct,
  uploadProductImages,
} from "../services/productService.js";
import {
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
  getProductValidator,
} from "../utils/validators/productValidator.js";
import { allowedTo, verifyToken } from "../services/authService.js";

const router = Router();

router
  .route("/")
  .post(
    verifyToken,
    allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    createProductValidator,
    createProduct
  )
  .get(getProducts);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .patch(
    verifyToken,
    allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateProduct
  )
  .delete(
    verifyToken,
    allowedTo("admin"),
    deleteProductValidator,
    deleteProduct
  );

export default router;
