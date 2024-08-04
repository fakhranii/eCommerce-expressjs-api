import { check } from "express-validator";

import ProductModel from "../../models/productModel.js";
import { ApiError } from "../classes/apiError.js";
import { validationMiddleware } from "../../middlewares/validatorMiddleware.js";

export const addProductIdToWishListValidator = [
  check("productId")
    .isMongoId()
    .withMessage("Invalid product id format")
    .custom(async (val, { req }) => {
      const product = await ProductModel.findOne({ _id: req.body.productId });
      if (!product) {
        throw new ApiError("product not found", 404);
      }
      return true;
    }),
  validationMiddleware,
];
