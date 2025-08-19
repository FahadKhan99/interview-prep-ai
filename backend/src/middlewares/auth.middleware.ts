import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../utils/httpStatusCodes";

interface JwtPayload {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string; // or: userId: string | undefined
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Access denied. No token provided." });
    }

    // verify the jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    if (!decoded.userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: "Invalid Token." });
    }

    // set the userId to every protected req.
    req.userId = decoded.userId;
    next();
  } catch (error: any) {
    console.error("Error in protect middleware:", error);
    return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: "Something went wrong" });
  }
};