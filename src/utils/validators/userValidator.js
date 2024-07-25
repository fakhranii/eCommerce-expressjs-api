import slugify from "slugify";
import bcrypt from "bcryptjs";

import { body, check, param } from "express-validator";
import { validationMiddleware } from "../../middlewares/validatorMiddleware.js";
import UserModel from "../../models/userModel.js";

// first the rules, then the validation Middleware error handling to catch the errors from the rules

export const createUserValidator = [
  check("name")
    .notEmpty()
    .withMessage(`User required`)
    .isLength({ min: 3 })
    .withMessage(`Too short User name`)
    .isLength({ max: 25 })
    .withMessage(`Too long User name`)
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

  check("profileImage").optional(),
  check("role").optional(),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage(
      "Invaild phone number only accepted Egy and SA phone numberss"
    ),

  validationMiddleware,
];

export const getUserValidator = [
  param("id").isMongoId().withMessage(`Invalid User id format`),
  validationMiddleware,
];

export const updateUserValidator = [
  param("id").isMongoId().withMessage(`Invalid User id format`),
  body("name")
    .optional()
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
  check("profileImage").optional(),
  check("role").optional(),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage(
      "Invaild phone number only accepted Egy and SA phone numberss"
    ),

  validationMiddleware,
];

export const deleteUserValidator = [
  param("id").isMongoId().withMessage(`Invalid User id format`),
  validationMiddleware,
];

export const changeUserPasswordValidator = [
  check("currentPassword")
    .notEmpty()
    .withMessage("You must enter your current password"),

  check("confirmNewPassword")
    .notEmpty()
    .withMessage("You must confirm your password"),

  check("newPassword")
    .notEmpty()
    .withMessage("You must enter your new password")
    .custom(async (val, { req }) => {
      // verify current password
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        throw new Error(`There is no user for this id : ${req.params.id}`);
      }
      const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        user.password
      );
      if (!isCorrectPassword) {
        throw new Error("Incorrect current password");
      }

      // verify password confirm
      if (val !== req.body.confirmNewPassword) {
        throw new Error("Password Confirmation incorrect");
      }
      return true;
    }),
  validationMiddleware,
];

export const updateLoggedUserDataValidator = [
  body("name")
    .optional()
    .custom((value, { req }) => {
      req.body.slug = slugify(value);
      return true;
    }),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Invalid email address")
    .custom((val) =>
      UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error("E-mail already in user"));
        }
      })
    ),
  check("profileImage").optional(),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG", "ar-SA"])
    .withMessage(
      "Invaild phone number only accepted Egy and SA phone numberss"
    ),

  validationMiddleware,
];
