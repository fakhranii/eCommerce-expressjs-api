import { Router } from "express";

import {
  createBrandValidator,
  deleteBrandValidator,
  getBrandValidator,
  updateBrandValidator,
} from "../utils/validators/brandValidator.js";
import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  resizeImages,
  updateBrand,
  uploadBrandImage,
} from "../services/brandService.js";
import { allowedTo, verifyToken } from "../services/authService.js";

const router = Router();

router
  .route("/")
  .post(
    verifyToken,
    allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImages,
    createBrandValidator,
    createBrand
  )
  .get(getBrands);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .patch(
    verifyToken,
    allowedTo("admin", "manager"),
    uploadBrandImage,
    resizeImages,
    updateBrandValidator,
    updateBrand
  )
  .delete(verifyToken, allowedTo("admin"), deleteBrandValidator, deleteBrand);

export default router;
