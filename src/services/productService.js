import ProductModel from "../models/productModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/coreCrud/coreCrud.js";

/**
 * @desc create a new product
 * @route POST /api/v1/products
 * @access private
 */
export const createProduct = createOne(ProductModel);

/**
 * @desc get list of products
 * @route GET /api/v1/products
 * @access public
 */
export const getProducts = getAll(ProductModel);

/**
 * @desc get specific product by id
 * @route GET /api/v1/products/:id
 * @access public
 */
export const getProduct = getOne(ProductModel);

/**
 * @desc update specific product by id
 * @route GET /api/v1/products/:id
 * @access private
 */
export const updateProduct = updateOne(ProductModel);

/**
 * @desc update specific product by id
 * @route GET /api/v1/products/:id
 * @access private
 */
export const deleteProduct = deleteOne(ProductModel);
