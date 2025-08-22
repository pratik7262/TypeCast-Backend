import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createSnapshot, getAllSnapshots, getLatestSnapshot } from "../controllers/snapshot.controller.js";

const router = Router();

router.post("/:docId", authMiddleware, createSnapshot);

router.get("/:docId/latest", authMiddleware, getLatestSnapshot);

router.get("/:docId", authMiddleware, getAllSnapshots);

export default router;
