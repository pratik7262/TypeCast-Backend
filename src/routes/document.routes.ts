import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addCollaborator,
  createDocument,
  deleteDocument,
  getDocument,
  getDocuments,
  updateTitle,
} from "../controllers/document.controller.js";

const router = Router();

router.post("/", authMiddleware, createDocument);

router.get("/:id", authMiddleware, getDocument);

router.get("/", authMiddleware, getDocuments);

router.put("/updateTitle/:id", authMiddleware, updateTitle);

router.put("/addCollaborator/:id", authMiddleware, addCollaborator);

router.delete("/:id", authMiddleware, deleteDocument);

export default router;
