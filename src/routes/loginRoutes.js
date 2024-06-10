// routes/loginRoutes.js
import express from 'express';
import loginController from '../controllers/loginController.js';

const router = express.Router();

router.use('/', loginController);

export default router;
