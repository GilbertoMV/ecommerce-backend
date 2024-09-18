import express from 'express';
import {createPreferences} from '../controllers/paymentController.js'

const router = express.Router();

router.post('/', createPreferences);

export default router;