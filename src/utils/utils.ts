import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { error } from "console";
import type { Request } from "express";

dotenv.config();

export const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
};

export const getUserId = (req: Request) => {
  if (!req.user) {
    throw error("user is undefined");
  }

  let userId;

  if (typeof req.user === "string") {
    userId = req.user;
  } else if ("id" in req.user) {
    userId = req.user.id;
  } else {
    throw error("Invalid user object");
  }

  return userId;
};
