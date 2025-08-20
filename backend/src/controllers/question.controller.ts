import type { Request, Response } from "express";
import { Question, type QuestionType } from "../models/question.model";
import { HttpStatus } from "../utils/httpStatusCodes";
import { Lesson } from "../models/lesson.model";
import type { QuerySelector } from "mongoose";

// add more questions to lesson
export const addQuestionsToLesson = async (req: Request, res: Response) => {
  try {
    const { lessonId, questions } = req.body;

    if (!lessonId || !questions || !Array.isArray(questions)) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Invaid input data" });
    }

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Lesson not found." });
    }

    const createdQuestions = await Question.insertMany(
      questions.map((q: QuestionType) => ({
        lessonId,
        question: q.question,
        answer: q.answer,
      }))
    );

    // update lesson with new questions ids
    lesson.questions.push(...createdQuestions.map((q) => q._id));
    await lesson.save();

    return res.status(HttpStatus.CREATED).json(createdQuestions);
  } catch (error: any) {
    console.log("Error in addQuestionsToLesson: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong." });
  }
};

export const togglePinQuestion = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Question not found." });
    }

    // update the pin
    question.isPinned = !question.isPinned;
    await question.save();

    return res.status(HttpStatus.OK).json(question);
  } catch (error: any) {
    console.log("Error in togglePinQuestion: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong." });
  }
};

// add notes to questions
export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const { note } = req.body;
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Question not found." });
    }

    question.note = note || "";
    await question.save();

    return res.status(HttpStatus.OK).json(question);
  } catch (error: any) {
    console.log("Error in addQuestionsToLesson: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong." });
  }
};
