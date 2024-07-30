import ReviewModel from "../models/reviewModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

// we use it in create review with nested route
export const setProductIdAndUserIdToBody = (req, res, next) => {
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user._id;
  next();
};

/**
 * @desc create a new review
 * @route POST /api/v1/reviews
 * @access protected / user
 */
export const createReview = createOne(ReviewModel);

// Nested Route
// /api/v1/products/:productId/reviews
export const createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.productId) filterObj = { product: req.params.productId };
  req.filterObj = filterObj;
  next();
};

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
