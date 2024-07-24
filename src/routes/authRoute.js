import { Router } from "express";
import {
  loginValidator,
  signupValidator,
} from "../utils/validators/authValidator.js";
import { forgotPassword, login, signUp } from "../services/authService.js";

const router = Router();

router.post("/signup", signupValidator, signUp);
router.post("/login", loginValidator, login);
router.post("/forgotPassword", forgotPassword);

export default router;
