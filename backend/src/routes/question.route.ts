import express from "express";
import { protect } from "../middlewares/auth.middleware";
import { addQuestionsToLesson, togglePinQuestion, updateQuestion } from "../controllers/question.controller";

const questionRouter = express.Router();

// add more questions
questionRouter.route("/add").post(protect, addQuestionsToLesson);
questionRouter.route("/:id/pin").post(togglePinQuestion);
questionRouter.route("/:id/update").post(updateQuestion);

export default questionRouter;
