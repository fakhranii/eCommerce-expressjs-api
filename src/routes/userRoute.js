import { Router } from "express";

import {
  changeUserPassword,
  createUser,
  deactivateUser,
  getLoggedUserData,
  getUser,
  getUsers,
  resizeUserImage,
  updateLoggedUserPassword,
  updateLoggedUserData,
  updateUser,
  uploadUserImage,
  deactivateLoggedUser,
  activateLoggedUser,
} from "../services/userService.js";
import {
  changeUserPasswordValidator,
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateLoggedUserDataValidator,
  updateUserValidator,
} from "../utils/validators/userValidator.js";
import { allowedTo, verifyToken } from "../services/authService.js";

const router = Router();

router.use(verifyToken); // apply on all routes (only below it)

router.get("/getMe", getLoggedUserData, getUser);
router.patch("/changeMyPassword", updateLoggedUserPassword);
router.patch("/updateMe", updateLoggedUserDataValidator, updateLoggedUserData);
router.delete("/deactiveMe", deactivateLoggedUser);
router.patch("/activeMe", activateLoggedUser);

//! Admin routes
router.use(allowedTo("admin"));

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
  .delete(deleteUserValidator, deactivateUser);

export default router;
