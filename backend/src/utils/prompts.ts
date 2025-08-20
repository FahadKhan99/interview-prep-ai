import type { QuestionType } from "../models/question.model";

export const questionAnswerPrompt = (
  role: string,
  experience: string,
  topicsToFocus: string,
  numberOfQuestions: number
) => `
  You are an AI trained to generate technical interview questions and answers.

  Task:
  - Role: ${role}
  - Candidate Experience: ${experience} years
  - Focus Topics: ${topicsToFocus}
  - Write ${numberOfQuestions} interview questions.
  - For each question, generate a detailed but beginner-friendly answer.
  - If the answer needs a code example, add a small code block inside.
  - Keep the formatting clean and consistent.
  - Return a **valid JSON array** with this format:
    [
      {
        "question": "Question here?",
        "answer": "Answer here."
      },
      ...
    ]
  Important: Do NOT add extra text. Only return valid JSON.
  `;

// Only the question
export const conceptExplainPrompt = (question: string) => `
  You are an AI trained to generate explanations for a given interview question.

  Task:
  - Explain the following interview question and its concept in depth as if you are teaching a beginner developer.
  - Question: "${question}"
  - After the explanation, provide a short and clear title that summarizes the concept for the article or a page header.
  - If explanation includes a code example, provide a small code block.
  - Keep the formatting clean and consistent.
  - Return the result as a valid JSON object with this format:
    {
      "title": "Short title here.",
      "explanation": "Explanation here."
    }
  Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
`;
