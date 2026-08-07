import { Schema, model, Document, Types } from 'mongoose';

export interface IWasteScan extends Document {
  user: Types.ObjectId;
  imageUrl: string;
  category: string;
  confidenceScore: number;
  recommendedBin: string;
  pointsAwarded: number;
  disposalInstruction?: string;
  environmentalMessage?: string;
}

const WasteScanSchema = new Schema<IWasteScan>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  confidenceScore: { type: Number, default: 0 },
  recommendedBin: { type: String },
  pointsAwarded: { type: Number, default: 0 },
  disposalInstruction: { type: String },
  environmentalMessage: { type: String }
}, { timestamps: true });

export const WasteScanModel = model<IWasteScan>('WasteScan', WasteScanSchema);
