import { body, check, param } from "express-validator";
import { validationMiddleware } from "../middlewares/validatorMiddleware.js";
import slugify from "slugify";
import { ReturnDocument } from "mongodb";

// first the rules, then the validation Middleware error handling to catch the errors from the rules
export const getBrandValidator = [
  param("id").isMongoId().withMessage(`Invalid Brand id format`),
  validationMiddleware,
];

export const createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage(`Brand required`)
    .isLength({ min: 3 })
    .withMessage(`Too short Brand name`)
    .isLength({ max: 32 })
    .withMessage(`Too long Brand name FROM VA`),
  body("name").custom((value, { req }) => {
    req.body.slug = slugify(value);
    return true;
  }),
  validationMiddleware,
];
export const updateBrandValidator = [
  param("id").isMongoId().withMessage(`Invalid Brand id format`),
  body("name")
    .optional()
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  validationMiddleware,
];
export const deleteBrandValidator = [
  param("id").isMongoId().withMessage(`Invalid Brand id format`),
  validationMiddleware,
];
