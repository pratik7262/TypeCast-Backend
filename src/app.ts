import express from "express";
import type { Response, Request } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

app.use("/api/user", userRouter);

export default app;
