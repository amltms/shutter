import express from 'express';
import controller from '../controllers/itemController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, controller.getSaved).put(protect, controller.saveItem);

export default router;
