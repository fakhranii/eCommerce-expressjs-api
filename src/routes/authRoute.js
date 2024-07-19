import { Router } from "express";
import { loginValidator, signupValidator } from "../utils/validators/authValidator.js";
import { login, signUp } from "../services/authService.js";

const router = Router();

router.route("/signup").post(signupValidator, signUp);
router.route("/login").post(loginValidator, login);

export default router;
