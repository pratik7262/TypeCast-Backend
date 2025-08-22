import type { Request, Response } from "express";
import Document from "../models/document.model.js";
import { errorHandler, getUserId } from "../utils/utils.js";

export const createDocument = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const userId = getUserId(req);

    const document = await Document.create({
      title,
      owner: userId,
      collaborators: [userId],
    });

    return res
      .status(201)
      .json({ success: true, message: "Documment created successfully" });
  } catch (error) {
    console.log(error);
    return errorHandler(res);
  }
};

export const getDocument = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

    return res.status(200).json({
      success: true,
      document,
    });
  } catch (error) {
    console.log(error);
    return errorHandler(res);
  }
};

export const getDocuments = async (req: Request, res: Response) => {
  try {
    const userId = getUserId(req);

    const documents = await Document.find({ owner: userId }).sort({
      updatedAt: -1,
    });

    return res.status(200).json({ success: true, documents });
  } catch (error) {
    console.log(error);
    return errorHandler(res);
  }
};

export const updateTitle = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const updatedDoc = await Document.findByIdAndUpdate(
      req.params.id,
      {
        title,
      },
      { new: true }
    );

    if (!updatedDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Document ont found" });
    }

    return res.status(200).json({ success: true, document: updatedDoc });
  } catch (error) {
    console.log(error);
    return errorHandler(res);
  }
};

export const addCollaborator = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { collaborator } = req.body;

    const document = await Document.findById(id);

    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "Document ont found" });
    }

    const collaborators = [...document.collaborators];
    collaborators.push(collaborator);

    const updatedDoc = await Document.findByIdAndUpdate(
      req.params.id,
      {
        collaborators,
      },
      { new: true }
    );

    return res.status(200).json({ success: true, document: updatedDoc });
  } catch (error) {
    console.log(error);
    return errorHandler(res);
  }
};

export const deleteDocument = async (req: Request, res: Response) => {
  try {
    const deletedDoc = await Document.findByIdAndDelete(req.params.id);

    if (!deletedDoc) {
      return res
        .status(404)
        .json({ success: false, message: "Document not found" });
    }

    res.json({ success: true, message: "Document deleted successfully" });
  } catch (error: any) {
    console.log(error);
    return errorHandler(res);
  }
};
