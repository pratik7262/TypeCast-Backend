import type { Request, Response } from "express";
import Snapshot from "../models/snapshot.model.js";

export const createSnapshot = async (req: Request, res: Response) => {
  try {
    const { currentState } = req.body;
    const { docId } = req.params;

    const snapshot = await Snapshot.create({
      documentId: docId,
      state: currentState,
    });

    return res.status(201).json({ success: true, snapshot });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getLatestSnapshot = async (req: Request, res: Response) => {
  try {
    const { docId } = req.params;
    const snapshot = await Snapshot.findOne({ documentId: docId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({ success: true, snapshot });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllSnapshots = async (req: Request, res: Response) => {
  try {
    const { docId } = req.params;

    const snapshots = await Snapshot.find({ documentId: docId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, snapshots });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
