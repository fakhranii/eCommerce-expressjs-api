import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import UserModel from "../models/userModel.js";
import { ApiError } from "../utils/classes/apiError.js";

const createToken = (payload) =>
  jwt.sign({ userId: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

/**
 * @desc   signup
 * @route  POST /api/v1/auth/signup
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

/**
 * @desc   login
 * @route  POST /api/v1/auth/login
 * @access public
 */
export const login = asyncHandler(async (req, res, next) => {
  // 1 ) check if email & password sent in the body (validation)
  // 2 ) check if the user exits & check if the password is correct
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    // throw new Error()
    return next(new ApiError("InCorrect email or password", 401));
  }
  // 3 ) generate token and send it to client side
  const token = createToken(user._id);
  res.status(200).json({ data: user, token });
});

export const verifyToken = asyncHandler(async (req, res, next) => {
  // 1 ) check if token exists, if exist get it
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(
        `You are not login, please login first to access this route`,
        401
      )
    );
  }

  // 2 ) verfify token (check if it valid, And no changes happen)
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);
  // 3 ) check if user exists
  const currentUser = await UserModel.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        "The user that belong to this token does no longer exist",
        401
      )
    );
  }
  // 4 ) check the if user change his password after token created
  if (currentUser.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    // Password changed after token created (Error)
    if (passChangedTimestamp > decoded.iat) {
      return next(
        new ApiError(
          "User recently changed his password. please login again..",
          401
        )
      );
    }
  }

  req.user = currentUser;
  next();
});
