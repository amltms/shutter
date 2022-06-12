import express from 'express';
import controller from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', protect, controller.getMe);
router.get('/save', protect, controller.save);

export default router;
