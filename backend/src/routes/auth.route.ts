import express from "express";

import {
  getUserProfile,
  loginUser,
  logoutUser,
  registerUser,
  uploadImageHandler,
} from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";
import upload from "../middlewares/upload.middleware";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.route("/logout").post(logoutUser);
authRouter.route("/profile").get(protect, getUserProfile);

authRouter
  .route("/upload-image")
  .post(upload.single("image"), uploadImageHandler);

export default authRouter;
