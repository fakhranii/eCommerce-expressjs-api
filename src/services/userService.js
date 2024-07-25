import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import bcrypt from "bcryptjs";

import { uploadSingleImage } from "../middlewares/uploadImagesMiddleware.js";
import { createOne, getAll, getOne } from "./handlerFactory.js";
import UserModel from "../models/userModel.js";
import { createJwtToken } from "../utils/createToken.js";

/**
 * @desc create new user
 * @route POST /api/v1/users
 * @access private/Admin
 */
export const uploadUserImage = uploadSingleImage("profileImage");
export const resizeUserImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`src/uploads/users/${filename}`);

    // save the image into Database
    req.body.profileImage = filename;
  }
  next();
});
export const createUser = createOne(UserModel);

/**
 * @desc update specific user by id
 * @route PATCH /api/v1/users
 * @access private/Admin
 */
export const updateUser = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      email: req.body.email,
      profileImage: req.body.profileImage,
      role: req.body.role,
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(
      new ApiError(`No document found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: document });
});

/**
 * @desc get specific user by id
 * @route GET /api/v1/users/:id
 * @access private/Admin
 */
export const getUser = getOne(UserModel);

/**
 * @desc get list of users
 * @route GET /api/v1/users/
 * @access private/Admin
 */
export const getUsers = getAll(UserModel);

/**
 * @desc delete specific user by id
 * @route DELETE /api/v1/users/:id
 * @access private/Admin
 */
// export const deleteUser = deleteOne(UserModel);
export const deactivateUser = asyncHandler(async (req, res) => {
  const deActivate = await UserModel.findByIdAndUpdate(
    req.params.id,
    { active: false },
    { new: true }
  );

  if (!deActivate) {
    return next(new ApiError(`No user found with id ${req.params.id}`, 404));
  }
  res.status(204).send();
});

/**
 * @desc  change user password id
 * @route DELETE /api/v1/users/password/:id
 * @access  private/Admin
 */
export const changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.newPassword, 12),
      // passwordChangedAt: Date.now(),
    },
    {
      new: true,
    }
  );
  if (!document) {
    return next(
      new ApiError(`No document found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ data: document });
});

/**
 * @desc get logged user data
 * @route GET /api/v1/users/getMe
 * @access protected
 */
export const getLoggedUserData = asyncHandler(async (req, res, next) => {
  req.params.id = req.user._id;
  next();
});

/**
 * @desc update logged user password
 * @route PATCH /api/v1/users/updateMyPassword
 * @access protected
 */
export const updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
  // update user password based on user payload (req.user._id)
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      password: await bcrypt.hash(req.body.newPassword, 12),
      passwordChangedAt: Date.now(),
    },
    { new: true }
  );
  if (!user) {
    return next(new ApiError(`No user found with id ${req.user._id}`, 404));
  }
  const token = createJwtToken(user._id);
  res.status(200).json({ data: user, token });
});

/**
 * @desc update logged user data (witout pass & role)
 * @route PATCH /api/v1/users/updateMe
 * @access protected
 */
export const updateLoggedUserData = asyncHandler(async (req, res, next) => {
  // update user password based on user payload (req.user._id)
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      profileImage: req.body.profileImage,
    },
    { new: true }
  );
  // if (!user) {
  //   return next(new ApiError(`No user found with id ${req.user._id}`, 404));
  // }
  res.status(200).json({ data: user });
});

/**
 * @desc deactive logged user
 * @route DELETE /api/v1/users/deactiveMe
 * @access protected
 */
export const deactivateLoggedUser = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, { active: false });
  res.status(204).json({ message: "deactivate successfully" });
});

/**
 * @desc active logged user
 * @route DELETE /api/v1/users/deactiveMe
 * @access protected
 */
export const activateLoggedUser = asyncHandler(async (req, res, next) => {
  await UserModel.findByIdAndUpdate(req.user._id, { active: true });
  res.status(200).json({ message: "activate successfully" });
});
