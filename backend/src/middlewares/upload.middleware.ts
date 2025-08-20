import multer from "multer";
import type { Request } from "express";
import type { FileFilterCallback } from "multer";

// configure the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify upload folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // create unique filename
  },
});

// Define the file filter
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ["image/webp", "image/png", "image/jpg", "image/jpeg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only .jpg, .png, .jpeg, and .webp formats are allowed")); // Reject the file
  }
};

// Setup multer upload with storage and file filter
const upload = multer({ storage, fileFilter });

export default upload;
