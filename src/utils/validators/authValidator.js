import slugify from "slugify";

import { check } from "express-validator";
import { validationMiddleware } from "../middlewares/validatorMiddleware.js";
import UserModel from "../../models/userModel.js";

// first the rules, then the validation Middleware error handling to catch the errors from the rules

export const signupValidator = [
  check("name")
    .notEmpty()
    .withMessage(`User required`)
    .isLength({ min: 3 })
    .withMessage(`Too short User name`)
    .isLength({ max: 25 })
    .withMessage(`Too long User name `)
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),

  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in user"));
        }
      })
    ),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 letters")
    .custom((password, { req }) => {
      if (password !== req.body.confirmPassword) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Password confirmation required"),

  validationMiddleware,
];

export const loginValidator = [
  check("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Invalid email address"),

  check("password")
    .notEmpty()
    .withMessage("Password required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 letters"),
  validationMiddleware,
];
