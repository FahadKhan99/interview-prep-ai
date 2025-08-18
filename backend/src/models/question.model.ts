import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
    question: String,
    answer: String,
    note: String,
    isPinned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model("Question", questionSchema);
