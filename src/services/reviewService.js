import ReviewModel from "../models/reviewModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

/**
 * @desc create a new review
 * @route POST /api/v1/reviews
 * @access protected / user
 */
export const createReview = createOne(ReviewModel);

/**
 * @desc get list of Reviews
 * @route GET /api/v1/reviews
 * @access public
 */
export const getReviews = getAll(ReviewModel);

/**
 * @desc get specific Review
 * @route POST /api/v1/reviews/:id
 * @access private
 */
export const getReview = getOne(ReviewModel);

/**
 * @desc update a specific Review
 * @route PATCH /api/v1/reviews/:id
 * @access protected / user
 */
export const updateReview = updateOne(ReviewModel);

/**
 * @desc delete a specific Review
 * @route  DELETE /api/v1/reviews/:id
 * @access protected / user - admin - manager
 */
export const deleteReview = deleteOne(ReviewModel);
