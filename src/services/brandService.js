import BrandModel from "../models/brandModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/coreCrud/coreCrud.js";

/**
 * @desc create a new brand
 * @route POST /api/v1/brands
 * @access private
 */
export const createBrand = createOne(BrandModel);

/**
 * @desc get list of brands
 * @route GET /api/v1/brands
 * @access public
 */
export const getBrands = getAll(BrandModel);

/**
 * @desc get specific brand
 * @route POST /api/v1/brands/:id
 * @access private
 */
export const getBrand = getOne(BrandModel);

/**
 * @desc update a specific brand
 * @route PATCH /api/v1/brands/:id
 * @access private
 */
export const updateBrand = updateOne(BrandModel);

/**
 * @desc delete a specific brand
 * @route  DELETE /api/v1/brands/:id
 * @access private
 */

export const deleteBrand = deleteOne(BrandModel);
