import mongoose, {
  Document as mongooseDocument,
  Schema,
  Types,
} from "mongoose";
import User from "./user.model.js";
interface IDocument extends mongooseDocument {
  title: string;
  owner: Types.ObjectId;
  collaborators: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema: Schema<IDocument> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    collaborators: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: User,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model<IDocument>("Document", DocumentSchema);

export default Document;
