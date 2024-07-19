import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import UserModel from "../models/userModel.js";
import { ApiError } from "../utils/classes/apiError.js";

const createToken = (payload) => {
  jwt.sign({ userId: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
};

/**
 * @desc   signup
 * @route  GET /api/v1/auth/signup
 * @access public
 */

export const signUp = asyncHandler(async (req, res, next) => {
  // 1 ) create user
  const user = await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // 2 ) generate jwt
  const token = createToken(user._id);
  res.status(201).json({ data: user, token });
});

export const login = asyncHandler(async (req, res, next) => {
  // 1 ) check if email & password sent in the body (validation)
  // 2 ) check if the user exits & check if the password is correct
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    // throw new Error()
    return next(new ApiError("InCorrect email or password"));
  }
  // 3 ) generate token and send it to client side
  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});
