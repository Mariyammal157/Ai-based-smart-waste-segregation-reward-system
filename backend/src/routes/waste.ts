import { Router } from 'express';
import multer from 'multer';
import { scanWaste } from '../controllers/wasteController';

const router = Router();
const upload = multer();

router.post('/scan', upload.single('file'), scanWaste);

export default router;
