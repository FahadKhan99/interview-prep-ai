import type { Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatusCodes";
import { conceptExplainPrompt, questionAnswerPrompt } from "../utils/prompts";
import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

// const GeminiAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateInterviewQuestions = async (
  req: Request,
  res: Response
) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Missing required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    // model setup
    const apiKey = process.env.GEMINI_API_KEY! as string;
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const rawText = response.text();

    if (!rawText) {
      return res.status(500).json({
        message: "No content was returned. Please try again.",
      });
    }

    // clean AI response, remove ```json and ``` if present
    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    return res.status(HttpStatus.OK).json(data);
  } catch (error: any) {
    console.log("Error generating interview questions: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong." });
  }
};

// when user clicks learn more, this is fired
export const generateConceptExplanation = async (
  req: Request,
  res: Response
) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Failed to generate concept explanation" });
    }

    const prompt = conceptExplainPrompt(question as string);

    // model setup
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    // generate content
    const result = await model.generateContent(prompt);
    const response = result.response;
    const rawText = response.text();

    if (!rawText) {
      return res.status(500).json({
        message: "No content was returned. Please try again.",
      });
    }

    // clean AI response, remove ```json and ``` if present
    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanedText);

    return res.status(HttpStatus.OK).json(data);
  } catch (error: any) {
    console.log("Error generating concept explanation: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong." });
  }
};
