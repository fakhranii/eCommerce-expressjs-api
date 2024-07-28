import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

import ProductModel from "../models/productModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";
import { uploadMixedImages } from "../middlewares/uploadImagesMiddleware.js";

export const uploadProductImages = uploadMixedImages([
  { name: "imageCover", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

export const resizeProductImages = asyncHandler(async (req, res, next) => {
  //? 1 ) image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`src/uploads/products/${imageCoverFileName}`);

    // save the image into Database
    req.body.imageCover = imageCoverFileName;
  }
  //? 2 ) image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (image, index) => {
        const imagesFileName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;
        await sharp(image.buffer)
          .resize(600, 600)
          .toFormat("jpeg")
          .jpeg({ quality: 95 })
          .toFile(`src/uploads/products/${imagesFileName}`);

        // save the image into Database
        return req.body.images.push(imagesFileName);
      })
    );
  }

  next();
});

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
export const getProduct = getOne(ProductModel, "reviews");

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
