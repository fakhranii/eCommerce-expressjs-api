import CouponModel from "../models/couponModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

// @desc    Get list of coupons
// @route   GET /api/v1/coupons
// @access  Private/Admin-Manager
export const getCoupons = getAll(CouponModel);

// @desc    Get specific coupon by id
// @route   GET /api/v1/coupons/:id
// @access  Private/Admin-Manager
export const getCoupon = getOne(CouponModel);

// @desc    Create coupon
// @route   POST  /api/v1/coupons
// @access  Private/Admin-Manager
export const createCoupon = createOne(CouponModel);

// @desc    Update specific coupon
// @route   PUT /api/v1/coupons/:id
// @access  Private/Admin-Manager
export const updateCoupon = updateOne(CouponModel);

// @desc    Delete specific coupon
// @route   DELETE /api/v1/coupons/:id
// @access  Private/Admin-Manager
export const deleteCoupon = deleteOne(CouponModel);
