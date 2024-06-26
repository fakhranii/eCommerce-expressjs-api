import CategoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import asyncHandler from "express-async-handler";

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
  const { page } = req.query * 1 || 1;
  const { limit } = req.query * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ page, results: categories.length, data: categories });
});

/**
 * @desc get specific category
 * @route POST /api/v1/categories/:id
 * @access private
 */
export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  console.log(category);
  if (!category) {
    res.status(404).json({ msg: `No Category found for this ${id}` });
  }
  res.status(200).json({ data: category });
});

/**
 * @desc update specific category
 * @route PATCH /api/v1/categories/:id
 * @access private
 */
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await CategoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true } //* this option is to return a category after the update completes
  );
  if (!category) {
    res.status(404).json({ msg: `No Category  found with id ${id}` });
  }
  res.status(200).json({ data: category });
});

/**
 * @desc delete specific category
 * @route  DELETE /api/v1/categories/:id
 * @access private
 */

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    res.status(404).json({ msg: `No Category found with this ${id}` });
  }
  res.status(204).send();
});
