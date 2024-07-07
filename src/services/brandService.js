import slugify from "slugify";
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/classes/apiError.js";
import BrandModel from "../models/brandModel.js";
import { ApiFeatures } from "../utils/classes/apiFeatures.js";

/**
 * @desc create a new brand
 * @route POST /api/v1/brands
 * @access private
 */
export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await BrandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

/**
 * @desc get list of brands
 * @route GET /api/v1/brands
 * @access public
 */
export const getBrands = asyncHandler(async (req, res) => {
  const documentsCount = await BrandModel.countDocuments();
  const apiFeatures = new ApiFeatures(BrandModel.find(), req.query)
    .paginate(documentsCount)
    .filter()
    .search()
    .selectFields()
    .sort();

  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;
  res
    .status(200)
    .json({ results: brands.length, paginationResult, data: brands });
});

/**
 * @desc get specific brand
 * @route POST /api/v1/brands/:id
 * @access private
 */
export const getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findById(id);
  if (!brand) {
    return next(new ApiError(`No brand found for this ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

/**
 * @desc update a specific brand
 * @route PATCH /api/v1/brands/:id
 * @access private
 */
export const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await BrandModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true } //* this option is to return a brand after the update completes
  );
  if (!brand) {
    return next(new ApiError(`No brand found with id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

/**
 * @desc delete a specific brand
 * @route  DELETE /api/v1/brands/:id
 * @access private
 */

export const deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await BrandModel.findByIdAndDelete(id);
  if (!brand) {
    return next(new ApiError(`No brand found with id ${id}`, 404));
  }
  res.status(204).send();
});
