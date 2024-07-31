import { Router } from "express";
import {
  addProductToWishList,
  deleteProductToWishList,
  getLoggedUserWishlist,
} from "../services/wishlistService.js";
import { allowedTo, verifyToken } from "../services/authService.js";
import { addProductIdToWishListValidator } from "../utils/validators/wishlistValidator.js";

const router = Router();

router.use(verifyToken, allowedTo("user"));

router
  .route("/")
  .post(addProductIdToWishListValidator, addProductToWishList)
  .get(getLoggedUserWishlist);

router.delete("/:productId", deleteProductToWishList);

export default router;
