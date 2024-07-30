import { Router } from "express";
import {
  deleteReview,
  createReview,
  getReview,
  getReviews,
  updateReview,
  createFilterObj,
  setProductIdAndUserIdToBody,
} from "../services/reviewService.js";
import { allowedTo, verifyToken } from "../services/authService.js";
import {
  createReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
  updateReviewValidator,
} from "../utils/validators/reviewValidator.js";

const router = Router({ mergeParams: true }); // to enable nested route and receive params from the parent route

router
  .route("/")
  .post(
    verifyToken,
    allowedTo("user"),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  )
  .get(createFilterObj, getReviews);
router
  .route("/:id")
  .patch(verifyToken, allowedTo("user"), updateReviewValidator, updateReview)
  .get(getReviewValidator, getReview)
  .delete(
    verifyToken,
    allowedTo("manager", "admin", "user"),
    deleteReviewValidator,
    deleteReview
  );

export default router;
