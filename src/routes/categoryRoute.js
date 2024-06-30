/* eslint-disable import/extensions */
import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
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
  .post(createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .patch(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategory);
export default router;
