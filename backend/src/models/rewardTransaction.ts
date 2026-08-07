import { Schema, model, Document, Types } from 'mongoose';

export type RewardTransactionStatus = 'PENDING' | 'COMPLETED';

export interface IRewardTransaction extends Document {
  user: Types.ObjectId;
  reward: Types.ObjectId;
  pointsSpent: number;
  status: RewardTransactionStatus;
}

const RewardTransactionSchema = new Schema<IRewardTransaction>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  reward: { type: Schema.Types.ObjectId, ref: 'Reward', required: true },
  pointsSpent: { type: Number, required: true },
  status: { type: String, enum: ['PENDING', 'COMPLETED'], default: 'PENDING' }
}, { timestamps: true });

export const RewardTransactionModel = model<IRewardTransaction>('RewardTransaction', RewardTransactionSchema);
