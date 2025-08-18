import express from "express";
require("dotnev").config();
import cors from "cors";
import path from "path";
import http = require("http");

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["POST", "PUT", "GET", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}

// middleware
app.use(cors(corsOptions));

app.use(express.json());

// routes
app.use("/", () => {});   // landing page
app.use("/login", () => {}); // login 
app.use("/sign-up", () => {});
app.use("/interview-prep/:sessionId", () => {}); // interview prep


// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, "uploads"), {}))

// start server
const PORT = process.env.PORT || "5000"
app.listen(PORT, () => console.log(`Servers listening on PORT: ${PORT}`));