import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { error } from "console";
import User from "../models/user.model.js";
import { errorHandler, generateToken, getUserId } from "../utils/utils.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorHandler(res, 400, "All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorHandler(res, 400, "Email already exists");
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (err) {
    console.log(err);
    console.log(error);
    return errorHandler(res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return errorHandler(res, 400, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorHandler(res, 400, "Invalid credentials");
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (err) {
    console.log(error);
    return errorHandler(res);
  }
};

export const getUSer = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);
    const user = await User.findById(userId).select("-password");
    res.json(user);
  } catch (err) {
    console.log(error);
    return errorHandler(res);
  }
};
