/* eslint-disable import/extensions */
import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  resizeImages,
  updateCategory,
  uploadCategoryImage,
} from "../services/cateoryService.js";
import {
  createCategoryValidator,
  deleteCategoryValidator,
  getCategoryValidator,
  updateCategoryValidator,
} from "../utils/validators/categoryvalidator.js";
import subCategoriesRoute from "../routes/subCategoryRoute.js";

const router = Router();
router.use("/:categoryId/subcategories", subCategoriesRoute);

router
  .route("/")
  .get(getCategories)
  .post(
    uploadCategoryImage,
    resizeImages,
    createCategoryValidator,
    createCategory
  );
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .patch(
    uploadCategoryImage,
    resizeImages,
    updateCategoryValidator,
    updateCategory
  )
  .delete(deleteCategoryValidator, deleteCategory);
export default router;
