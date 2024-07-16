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

const router = Router();

router
  .route("/")
  .post(uploadBrandImage, resizeImages, createBrandValidator, createBrand)
  .get(getBrands);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .patch(uploadBrandImage, resizeImages, updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export default router;
