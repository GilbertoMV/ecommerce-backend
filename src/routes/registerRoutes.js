// routes/registerRoutes.js
import express from 'express';
import registerController from '../controllers/registerController.js';

const router = express.Router();

router.use('/', registerController);

export default router;
