import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { error } from "console";
import User from "../models/user.model.js";
import { generateToken } from "../utils/utils.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
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
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUSer = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw error("user is undefined");
    }

    let userId: string;

    if (typeof req.user === "string") {
      userId = req.user;
    } else if ("id" in req.user) {
      userId = (req.user as any).id;
    } else {
      throw error("Invalid user object");
    }

    const user = await User.findById(userId).select("-password"); // Auth Middleware remaining
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
