import asyncHandler from "express-async-handler";

import UserModel from "../models/userModel.js";

/**
 * @desc  Add product to wishlist
 * @route POST /api/v1/wishlist
 * @access protected users
 */
export const addProductToWishList = asyncHandler(async (req, res, next) => {
  // $addToSet => add productId to wishlist if productId not exist
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: req.body.productId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product added successfully to your wishlist",
    data: user.wishlist,
  });
});

/**
 * @desc  Delete product from wishlist
 * @route DELETE /api/v1/wishlist/:wishlistId
 * @access protected users
 */
export const deleteProductToWishList = asyncHandler(async (req, res, next) => {
  // $pull => remove productId from wishlist if productId not exist
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: req.params.productId },
    },
    { new: true }
  );
  res.status(200).json({
    status: "success",
    message: "Product removed successfully from your wishlist",
    data: user.wishlist,
  });
});

/**
 * @desc    Get logged user wishlist
 * @route   GET /api/v1/wishlist
 * @access  Protected/User
 */
export const getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.user._id).populate("wishlist");

  res.status(200).json({
    status: "success",
    results: user.wishlist.length,
    data: user.wishlist,
  });
});
