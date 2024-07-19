import asyncHandler from "express-async-handler";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";
import bcrypt from "bcryptjs";

import { uploadSingleImage } from "../utils/middlewares/uploadImagesMiddleware.js";
import { createOne, getAll, getOne } from "../utils/coreCrud/coreCrud.js";
import UserModel from "../models/userModel.js";

/**
 * @desc create new user
 * @route POST /api/v1/users
 * @access Private
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
 * @access Private
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
 * @access Private
 */
export const getUser = getOne(UserModel);

/**
 * @desc get list of users
 * @route GET /api/v1/users/
 * @access Private
 */
export const getUsers = getAll(UserModel);

/**
 * @desc delete specific user by id
 * @route DELETE /api/v1/users/:id
 * @access Private
 */
// export const deleteUser = deleteOne(UserModel);
export const deleteUser = asyncHandler(async (req, res) => {
  const deActivate = await UserModel.findByIdAndUpdate(
    req.params.id,
    { active: (req.body.active = false) },
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
 * @access Private
 */
export const changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await UserModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.newPassword, 12),
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
