import { check } from "express-validator";

import ReviewModel from "../../models/reviewModel.js";
import { validationMiddleware } from "../../middlewares/validatorMiddleware.js";

export const createReviewValidator = [
  check("title").optional(),
  check("ratings")
    .notEmpty()
    .withMessage("ratings value required")
    .isFloat({ min: 1, max: 5 })
    .withMessage("Ratings value must be between 1 to 5"),
  check("user").isMongoId().withMessage("Invalid user id format"),
  check("product")
    .isMongoId()
    .withMessage("Invalid Product id format")
    .custom((val, { req }) =>
      // Check if logged user create review before
      ReviewModel.findOne({
        user: req.user._id,
        product: req.body.product,
      }).then((review) => {
        console.log(review);
        if (review) {
          return Promise.reject(
            new Error("You already created a review before")
          );
        }
      })
    ),
  validationMiddleware,
];

export const getReviewValidator = [
  check("id").isMongoId().withMessage("Invalid Review id format"),
  validationMiddleware,
];

export const updateReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) =>
      // Check review ownership before update
      ReviewModel.findById(val).then((review) => {
        if (!review) {
          return Promise.reject(new Error(`There is no review with id ${val}`));
        }

        if (review.user._id.toString() !== req.user._id.toString()) {
          return Promise.reject(
            new Error(`Your are not allowed to perform this action`)
          );
        }
      })
    ),
  validationMiddleware,
];

export const deleteReviewValidator = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Review id format")
    .custom((val, { req }) => {
      // Check review ownership before update
      if (req.user.role === "user") {
        return ReviewModel.findById(val).then((review) => {
          if (!review) {
            return Promise.reject(
              new Error(`There is no review with id ${val}`)
            );
          }
          if (review.user._id.toString() !== req.user._id.toString()) {
            return Promise.reject(
              new Error(`Your are not allowed to perform this action`)
            );
          }
        });
      }
      return true;
    }),
  validationMiddleware,
];
