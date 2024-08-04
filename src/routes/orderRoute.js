import { Router } from "express";

import { allowedTo, verifyToken } from "../services/authService.js";
import {
  createCashOrder,
  findAllOrders,
  findSpecificOrder,
  filterOrderForLoggedUser,
  updateOrderToPaid,
  updateOrderToDelivered,
  checkoutSession,
} from "../services/orderService.js";

const router = Router();

router.use(verifyToken);

router.get("/checkout-session/:cartId", allowedTo("user"), checkoutSession);

router.route("/:cartId").post(allowedTo("user"), createCashOrder);
router.get(
  "/",
  allowedTo("user", "admin", "manager"),
  filterOrderForLoggedUser,
  findAllOrders
);
router.get("/:id", findSpecificOrder);

router.patch("/:id/pay", allowedTo("admin", "manager"), updateOrderToPaid);
router.patch(
  "/:id/deliver",
  allowedTo("admin", "manager"),
  updateOrderToDelivered
);

export default router;
