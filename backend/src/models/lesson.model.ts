import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    topicsToFocus: { type: String, required: true },
    description: String,

    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],

    isInProgress: { type: Boolean, default: true }, // isInProgress
    isFavorite: { type: Boolean, default: false }, // bookmark
    visibility: {
      // sharing
      type: String,
      enum: ["private", "public"],
      default: "private",
    },
  },
  {
    timestamps: true,
  }
);

export type LessonType = mongoose.InferSchemaType<typeof lessonSchema>;

export const Lesson = mongoose.model("Lesson", lessonSchema);
