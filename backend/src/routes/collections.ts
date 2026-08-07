import { Router } from 'express';
import { createCollection, listCollections, updateStatus } from '../controllers/collectionController';

const router = Router();

router.post('/', createCollection);
router.get('/', listCollections);
router.patch('/:id/status', updateStatus);

export default router;
