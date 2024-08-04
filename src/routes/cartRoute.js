import { Router } from "express";

import { allowedTo, verifyToken } from "../services/authService.js";
import {
  addProductToCart,
  applyCoupon,
  clearCart,
  getLoggedUserCart,
  removeSpecificCartItem,
  updateCartItemQuantity,
} from "../services/cartService.js";

const router = Router();

router.use(verifyToken, allowedTo("user"));
router
  .route("/")
  .post(addProductToCart)
  .get(getLoggedUserCart)
  .delete(clearCart);

router.patch("/applyCoupon", applyCoupon);

router
  .route("/:itemId")
  .patch(updateCartItemQuantity)
  .delete(removeSpecificCartItem);

export default router;
