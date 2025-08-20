import express from "express";
import { protect } from "../middlewares/auth.middleware";
import {
  createLesson,
  deleteLesson,
  getLessonById,
  getMyLessons,
} from "../controllers/lesson.controller";

const lessonRouter = express.Router();

lessonRouter.route("/create").post(protect, createLesson);
lessonRouter.route("/my-lessons").get(protect, getMyLessons);
lessonRouter.route("/:id").get(protect, getLessonById);
lessonRouter.route("/:id").delete(protect, deleteLesson);

export default lessonRouter;
