import mongoose, {
  Schema,
  Types,
  Document as mongooseDocument,
} from "mongoose";
import Document from "./document.model.js";

interface ISnapshot extends mongooseDocument {
  documentId: Types.ObjectId;
  state: Buffer;
  createdAt: Date;
  updatedAt: Date;
}

const SnapshotSchema: Schema<ISnapshot> = new Schema(
  {
    documentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Document,
    },
    state: {
      type: Buffer,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Snapshot = mongoose.model<ISnapshot>("Snapshot", SnapshotSchema);
export default Snapshot;
