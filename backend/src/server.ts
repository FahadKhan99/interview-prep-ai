import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import { protect } from "./middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import lessonRouter from "./routes/lesson.route.js";
import questionRouter from "./routes/question.route.js";


dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["POST", "PUT", "GET", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter);
app.use("/api/lessons", lessonRouter);
app.use("/api/questions", questionRouter);

// app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
// app.use("/api/ai/generate-explanation", protect, generateInterviewExplanation);

// Serve uploads folder
app.use("/uploads", express.static(path.join(import.meta.dirname, "uploads")));

// connect to db & start server
const PORT = process.env.PORT || "5000";
connectDB().then(() =>
  app.listen(PORT, () => console.log(`Servers listening on PORT: ${PORT}`))
);
