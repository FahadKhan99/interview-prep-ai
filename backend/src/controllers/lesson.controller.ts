import type { Request, Response } from "express";
import { Lesson } from "../models/lesson.model";
import { Question, type QuestionType } from "../models/question.model";
import { HttpStatus } from "../utils/httpStatusCodes";

export const createLesson = async (req: Request, res: Response) => {
  try {
    const { role, experience, topicsToFocus, description, questions } =
      req.body;
    const userId = req.userId;
    console.log("loggedin user: ", userId);

    const lesson = await Lesson.create({
      user: userId,
      role,
      experience,
      topicsToFocus,
      description,
    });

    // save questions in DB as well.
    const questionDocs = await Promise.all(
      questions.map(async (q: QuestionType) => {
        const question = await Question.create({
          lessonId: lesson._id,
          question: q.question,
          answer: q.answer,
        });
        return question;
      })
    );

    lesson.questions = questionDocs.map((q) => q._id);
    await lesson.save();

    return res
      .status(HttpStatus.CREATED)
      .json({ message: "Lesson created successfully", lesson });
  } catch (error) {
    console.log("Error creating lesson: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong." });
  }
};

export const getMyLessons = async (req: Request, res: Response) => {
  try {
    const lessons = await Lesson.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .populate("questions");
    res.status(HttpStatus.OK).json({ lessons });
  } catch (error) {
    console.log("Error getMyLesson: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong." });
  }
};

export const getLessonById = async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate({
      path: "questions",
      options: {
        sort: { isPinned: -1, createdAt: -1 },
      },
    });

    if (!lesson) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Lesson not found" });
    }

    return res.status(HttpStatus.OK).json({ lesson });
  } catch (error) {
    console.log("Error getLessonById: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong." });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    const lesson = await Lesson.findById(req.userId);

    if (!lesson) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Lesson not found." });
    }

    // check if the logged-in user owns this session
    if (lesson.user?.toString() !== req.userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Not authorized to delete this lesson" });
    }

    // delete all questions linked to this lesson
    await Question.deleteMany({ lessonId: lesson._id });

    // then delete the session
    await lesson.deleteOne();

    return res
      .status(HttpStatus.OK)
      .json({ message: "Lesson deleted successfully." });
  } catch (error) {
    console.log("Error deleting lesson: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong." });
  }
};
