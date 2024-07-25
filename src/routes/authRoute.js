import { Router } from "express";
import {
  loginValidator,
  signupValidator,
} from "../utils/validators/authValidator.js";
import {
  forgotPassword,
  login,
  resetPassword,
  signUp,
  verifyPasswordResetCode,
} from "../services/authService.js";

const router = Router();

router.post("/signup", signupValidator, signUp);
router.post("/login", loginValidator, login);
router.post("/forgotPassword", forgotPassword);
router.post("/verifyResetCode", verifyPasswordResetCode);
router.patch("/resetPassword", resetPassword);

export default router;
