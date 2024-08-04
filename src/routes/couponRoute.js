import { Router } from "express";

import { allowedTo, verifyToken } from "../services/authService.js";
import {
  createCoupon,
  getCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} from "../services/couponService.js";

const router = Router();
router.use(verifyToken, allowedTo("admin", "manager"));

router.route("/").get(getCoupons).post(createCoupon);
router.route("/:id").get(getCoupon).patch(updateCoupon).delete(deleteCoupon);

export default router;
