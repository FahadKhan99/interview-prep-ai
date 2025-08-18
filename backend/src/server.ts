import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["POST", "PUT", "GET", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// middleware
app.use(cors(corsOptions));

app.use(express.json());

// routes
app.use("/", () => {}); // landing page
app.use("/login", () => {}); // login
app.use("/sign-up", () => {});
app.use("/interview-prep/:lessonId", () => {}); // interview prep

// Serve uploads folder
app.use("/uploads", express.static(path.join(import.meta.dirname, "uploads")));

// connect to db & start server
const PORT = process.env.PORT || "5000";
connectDB().then(() =>
  app.listen(PORT, () => console.log(`Servers listening on PORT: ${PORT}`))
);
