import express from "express";

import { getUserProfile, loginUser, registerUser } from "../controllers/auth.controller";
import { protect } from "../middlewares/auth.middleware";

const authRouter = express.Router();

authRouter.route("/register").post(registerUser);
authRouter.route("/login").post(loginUser);
authRouter.use(protect);
authRouter.route("/profile").get(getUserProfile);

export default authRouter;
