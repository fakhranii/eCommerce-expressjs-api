import { Router } from "express";
import {
  deleteReview,
  createReview,
  getReview,
  getReviews,
  updateReview,
} from "../services/reviewService.js";
import { allowedTo, verifyToken } from "../services/authService.js";
import {
  createReviewValidator,
  deleteReviewValidator,
  getReviewValidator,
  updateReviewValidator,
} from "../utils/validators/reviewValidator.js";

const router = Router();

router
  .route("/")
  .post(verifyToken, allowedTo("user"), createReviewValidator, createReview)
  .get(getReviews);
router
  .route("/:id")
  .patch(verifyToken, allowedTo("user"), updateReviewValidator, updateReview)
  .get(getReview)
  .delete(
    verifyToken,
    allowedTo("manager", "admin", "user"),
    deleteReviewValidator,
    deleteReview
  );

export default router;
