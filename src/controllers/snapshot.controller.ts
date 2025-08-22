import type { Request, Response } from "express";
import Snapshot from "../models/snapshot.model.js";
import { errorHandler } from "../utils/utils.js";

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
    console.log(error);
    return errorHandler(res);
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
    console.log(error);
    return errorHandler(res);
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
    console.log(error);
    return errorHandler(res);
  }
};
