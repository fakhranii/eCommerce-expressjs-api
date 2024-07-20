import SubCategoryModel from "../models/subCategoryModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

// Nested Route
export const setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

// Nested Route
export const createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

/**
 * @description create subCategory
 * @route       POST /api/v1/subcategories
 * @access      private
 */
export const createSubCategory = createOne(SubCategoryModel);

/**
 * @description get a specific subCategory
 * @route GET /api/v1/subcategories/:id
 * @access private
 */
export const getSubCategory = getOne(SubCategoryModel);

/**
 * @description get list of subCategories
 * @route GET /api/v1/subcategories/:id
 * @access
 */
export const getSubCategories = getAll(SubCategoryModel);

/**
 * @description update a specific subCategory
 * @route PATCH /api/v1/subcategories/:id
 * @access
 */
export const updateSubcategory = updateOne(SubCategoryModel);

/**
 * @description delete a specific subCategory
 * @route PATCH /api/v1/subcategories/:id
 * @access
 */
export const deleteSubcategory = deleteOne(SubCategoryModel);
