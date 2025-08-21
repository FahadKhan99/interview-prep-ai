import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, type UserType } from "../models/user.model";
import { Types } from "mongoose";
import type { Request, Response } from "express";
import { HttpStatus } from "../utils/httpStatusCodes";

const generateToken = (userId: Types.ObjectId) => {
  return jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, profileImageUrl } = req.body;

    // check if user already exits
    const existingUser = (await User.findOne({ email }).lean()) as UserType;

    if (existingUser?.email) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: "A user with this email already exists." });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      profileImageUrl,
    });

    // Send token as secure HTTP-only cookie
    res.cookie("token", generateToken(user._id), {
      httpOnly: true, // ⛔ can't access via JS (XSS protection)
      secure: process.env.NODE_ENV === "production", // ✅ use HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ⚠️ protects against CSRF (adjust if needed)
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });

    // send response with user data
    return res.status(HttpStatus.CREATED).json({
      message: "User created successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    console.log("Error while Registering: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Invalid email or password" });
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Invalid email or password" });
    }

    // Send token as secure HTTP-only cookie
    res.cookie("token", generateToken(user._id), {
      httpOnly: true, // ⛔ can't access via JS (XSS protection)
      secure: process.env.NODE_ENV === "production", // ✅ use HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ⚠️ protects against CSRF (adjust if needed)
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });

    // generate the token and return data
    return res.status(HttpStatus.OK).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageUrl: user.profileImageUrl,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    console.log("Error while Login: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

// requires JWT
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    return res.status(HttpStatus.OK).json(user);
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/", // must match the path used when setting the cookie
  });

  return res
    .status(HttpStatus.OK)
    .json({ message: "User logged out successfully" });
};

export const uploadImageHandler = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    return res.status(HttpStatus.OK).json({ imageUrl });
  } catch (error: any) {
    console.log("Error in uploadImage: ", error);
    return res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong" });
  }
};
