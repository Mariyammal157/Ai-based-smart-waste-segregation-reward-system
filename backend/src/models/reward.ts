import { Schema, model, Document } from 'mongoose';

export interface IReward extends Document {
  name: string;
  description?: string;
  pointsRequirement: number;
  image?: string;
  stock: number;
  active: boolean;
}

const RewardSchema = new Schema<IReward>({
  name: { type: String, required: true },
  description: { type: String },
  pointsRequirement: { type: Number, required: true },
  image: { type: String },
  stock: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });

export const RewardModel = model<IReward>('Reward', RewardSchema);
