import CategoryModel from "../models/categoryModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/coreCrud/coreCrud.js";

/**
 * @desc create a new category
 * @route POST /api/v1/categories
 * @access private
 */
export const createCategory = createOne(CategoryModel);

/**
 * @desc get list of categories
 * @route GET /api/v1/categories
 * @access public
 */
export const getCategories = getAll(CategoryModel);
/**
 * @desc get specific category
 * @route POST /api/v1/categories/:id
 * @access private
 */
export const getCategory = getOne(CategoryModel);
/**
 * @desc update specific category
 * @route PATCH /api/v1/categories/:id
 * @access private
 */

export const updateCategory = updateOne(CategoryModel);

/**
 * @desc delete specific category
 * @route  DELETE /api/v1/categories/:id
 * @access private
 */
export const deleteCategory = deleteOne(CategoryModel);
