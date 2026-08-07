import { Router } from 'express';
import { listRewards, redeemReward } from '../controllers/rewardController';

const router = Router();

router.get('/', listRewards);
router.post('/redeem', redeemReward);

export default router;
