import { error } from "console";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["auth-token"];
    const authHeader = Array.isArray(header) ? header[0] : header;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(400)
        .json({ success: false, message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];

    const jwtSecret = process.env.JWT_SECRET;

    if (!token) {
      throw error("Token is not provided");
    }

    const user = jwt.verify(token, jwtSecret as string);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};
