import asyncHandler from "express-async-handler";
import ProductModel from "../models/productModel.js";
import { ApiError } from "../utils/classes/apiError.js";
import { ApiFeatures } from "../utils/classes/apiFeatures.js";
import slugify from "slugify";
/**
 * @desc create a new product
 * @route POST /api/v1/products
 * @access private
 */
export const createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.create(req.body);
  res.status(201).json({ data: product });
});

/**
 * @desc get list of products
 * @route GET /api/v1/products
 * @access public
 */
export const getProducts = asyncHandler(async (req, res) => {
  // 3 ) build query
  const documentsCount = await ProductModel.countDocuments();
  const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
    .paginate(documentsCount)
    .filter()
    .search()
    .selectFields()
    .sort();

  //  excute the query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;
  res
    .status(200)
    .json({ paginationResult, results: products.length, data: products });
});

/**
 * @desc get specific product by id
 * @route GET /api/v1/products/:id
 * @access public
 */
export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  if (!product) {
    return next(new ApiError(`No product found with this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

/**
 * @desc update specific product by id
 * @route GET /api/v1/products/:id
 * @access private
 */
export const updateProduct = asyncHandler(async (req, res) => {
  if (req.body.title) {
    req.body.slug = slugify(req.body.title);
  }
  const { id } = req.params;
  const product = await ProductModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`No product found with this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

/**
 * @desc update specific product by id
 * @route GET /api/v1/products/:id
 * @access private
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);
  const product = await ProductModel.findByIdAndDelete(id);
  if (!product) {
    return next(new ApiError(`No product found with this id ${id}`, 404));
  }
  res.status(204).send();
});
