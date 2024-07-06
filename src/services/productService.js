import asyncHandler from "express-async-handler";
import ProductModel from "../models/productModel.js";
import { ApiError } from "../utils/classes/apiError.js";
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
  // 1 ) filtering
  const queryObject = { ...req.query }; // copy the internal value of req.query and assign it in queryObject
  const excludesFields = ["page", "sort", "limit", "fields", "keyword"];
  excludesFields.forEach((field) => delete queryObject[field]);

  // Apply filteration using [ gte, gt, lte, lt]
  let queryStr = JSON.stringify(queryObject);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  // 2 ) pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 50;
  const skip = (page - 1) * limit;

  // 3 ) build query
  let mongooseQuery = ProductModel.find(JSON.parse(queryStr))
    .skip(skip)
    .limit({ limit })
    .populate({ path: "category", select: "name -_id" });

  // 4 ) Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else {
    mongooseQuery = mongooseQuery.sort("-createdAt");
  }

  // 5 ) limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    mongooseQuery = mongooseQuery.select(fields);
  } else {
    mongooseQuery = mongooseQuery.select("-__v");
  }

  if (req.query.keyword) {
    let query = {};
    query.$or = [
      // $options: "i" -> means it search for the keyword in two formats capital or small letters
      { title: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
    mongooseQuery = mongooseQuery.find(query);
  }

  // 7 ) excute the query
  const products = await mongooseQuery;

  res.status(200).json({ results: products.length, page, data: products });
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
