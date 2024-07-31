import { Router } from "express";
import {
  addProductToWishList,
  deleteProductToWishList,
  getLoggedUserWishlist,
} from "../services/wishlistService.js";
import { allowedTo, verifyToken } from "../services/authService.js";
import { addProductIdToWishListValidator } from "../utils/validators/wishlistValidator.js";
import { addAddress, getLoggedUserAddresses, removeAddress } from "../services/addressService.js";

const router = Router();

router.use(verifyToken, allowedTo("user"));

router
  .route("/")
  .post( addAddress)
  .get(getLoggedUserAddresses);

router.delete("/:addressId", removeAddress);

export default router;
