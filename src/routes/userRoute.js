import { Router } from "express";

import {
  changeUserPassword,
  createUser,
  deleteUser,
  getUser,
  getUsers,
  resizeUserImage,
  updateUser,
  uploadUserImage,
} from "../services/userService.js";
import {
  changeUserPasswordValidator,
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
} from "../utils/validators/userValidator.js";
import { allowedTo, verifyToken } from "../services/authService.js";

const router = Router();

router
  .route("/changePassword/:id")
  .patch(changeUserPasswordValidator, changeUserPassword);

router
  .route("/")
  .post(
    verifyToken,
    allowedTo("admin"),
    uploadUserImage,
    resizeUserImage,
    createUserValidator,
    createUser
  )
  .get(getUsers);

router
  .route("/:id")
  .get(verifyToken, allowedTo("admin"), getUserValidator, getUser)
  .patch(
    verifyToken,
    allowedTo("admin"),
    uploadUserImage,
    resizeUserImage,
    updateUserValidator,
    updateUser
  )
  .delete(verifyToken, allowedTo("admin"), deleteUserValidator, deleteUser);

export default router;
