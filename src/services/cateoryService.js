import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import asyncHandler from "express-async-handler";

import CategoryModel from "../models/categoryModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/coreCrud/coreCrud.js";
import { uploadSingleImage } from "../utils/middlewares/uploadImagesMiddleware.js";

// Upload single image
export const uploadCategoryImage = uploadSingleImage("image");

// image processing
export const resizeImages = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`src/uploads/categories/${filename}`);

  // save the image into Database
  req.body.image = filename;

  next();
});

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
