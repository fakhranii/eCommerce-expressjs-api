import { check, param } from "express-validator";
import { validationMiddleware } from "../middlewares/validatorMiddleware.js";

// first the rules, then the validation Middleware error handling to catch the errors from the rules

export const getSubCategoryValidator = [
  param("id").isMongoId().withMessage(`Invalid SubCategory id format`),
  validationMiddleware,
];

export const createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage(`subCategory required`)
    .isLength({ min: 2 })
    .withMessage(`Too short subCategory name`)
    .isLength({ max: 32 })
    .withMessage(`Too long subCategory name FROM VA`),
  check("category")
    .notEmpty()
    .withMessage("subcategory must be belong to category")
    .isMongoId()
    .withMessage("Invalid Category id format"),
  validationMiddleware,
];

export const updateSubCategoryValidator = [
  param("id")
    .notEmpty()
    .isMongoId()
    .withMessage(`Invalid SubCategory id format`),
  validationMiddleware,
];

export const deleteSubCategoryValidator = [
  param("id").isMongoId().withMessage(`Invalid SubCategory id format`),
  validationMiddleware,
];
