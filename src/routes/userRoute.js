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

const router = Router();

router
  .route("/changePassword/:id")
  .patch(changeUserPasswordValidator, changeUserPassword);

router
  .route("/")
  .post(uploadUserImage, resizeUserImage, createUserValidator, createUser)
  .get(getUsers);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .patch(uploadUserImage, resizeUserImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

export default router;
