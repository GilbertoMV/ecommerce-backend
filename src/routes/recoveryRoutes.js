import express from 'express';
import { forgotPassword, resetPassword } from '../controllers/recoveryController.js';

const router = express.Router();

router.post('/forgot/', forgotPassword);
router.post('/reset/:token', resetPassword);

export default router;
