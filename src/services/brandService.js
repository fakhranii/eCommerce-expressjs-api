import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

import BrandModel from "../models/brandModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/coreCrud/coreCrud.js";
import { uploadSingleImage } from "../utils/middlewares/uploadImagesMiddleware.js";

// Upload single image
export const uploadBrandImage = uploadSingleImage("image");

// image processing
export const resizeImages = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`src/uploads/brands/${filename}`);

  // save the image into Database
  req.body.image = filename;

  next();
});

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
