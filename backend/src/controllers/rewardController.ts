import { Request, Response } from 'express';
import { RewardModel } from '../models/reward';
import { RewardTransactionModel } from '../models/rewardTransaction';
import { UserModel } from '../models/user';
import mongoose from 'mongoose';

export async function listRewards(req: Request, res: Response) {
  const rewards = await RewardModel.find({ active: true }).lean();
  res.json(rewards);
}

export async function redeemReward(req: Request, res: Response) {
  const { userId, rewardId } = req.body;
  if (!userId || !rewardId) return res.status(400).json({ message: 'userId and rewardId required' });

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await UserModel.findById(userId).session(session);
    const reward = await RewardModel.findById(rewardId).session(session);
    if (!user || !reward) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Not found' });
    }
    if (user.pointsBalance < reward.pointsRequirement) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Insufficient points' });
    }
    if (reward.stock <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Out of stock' });
    }

    user.pointsBalance -= reward.pointsRequirement;
    reward.stock -= 1;
    await user.save({ session });
    await reward.save({ session });

    const tx = await RewardTransactionModel.create([{ user: user._id, reward: reward._id, pointsSpent: reward.pointsRequirement, status: 'COMPLETED' }], { session });
    await session.commitTransaction();
    res.json({ success: true, transaction: tx[0] });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: 'Redemption failed' });
  } finally {
    session.endSession();
  }
}
