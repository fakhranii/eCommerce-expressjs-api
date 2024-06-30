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
  updateBrand,
} from "../services/brandService.js";

const router = Router();

router.route("/").post(createBrandValidator, createBrand).get(getBrands);
router
  .route("/:id")
  .get(getBrandValidator, getBrand)
  .patch(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);

export default router;
