import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/classes/apiError.js";

/**
 * @desc create a new category
 * @route POST /api/v1/categories
 * @access private
 */
export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

/**
 * @desc get list of categories
 * @route GET /api/v1/categories
 * @access public
 */
export const getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ page, results: categories.length, data: categories });
});

/**
 * @desc get specific category
 * @route POST /api/v1/categories/:id
 * @access private
 */
export const getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    return next(new ApiError(`No Category found for this ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

/**
 * @desc update specific category
 * @route PATCH /api/v1/categories/:id
 * @access private
 */
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await CategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true } //* this option is to return a category after the update completes
  );
  if (!category) {
    return next(new ApiError(`No Category  found with id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

/**
 * @desc delete specific category
 * @route  DELETE /api/v1/categories/:id
 * @access private
 */

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    return next(new ApiError(`No Category  found with id ${id}`, 404));
  }
  res.status(204).send();
});
