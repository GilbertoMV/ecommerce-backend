import express from 'express';
import {
    getAllRewards,
    getRewardById,
    getRewardByOrder,
    getRewardByUser,
    createReward,
    updateReward,
    deleteReward
}from '../controllers/rewardController.js';

const router = express.Router();

router.get('/', getAllRewards);
router.get('/:id', getRewardById);
router.get('/me/:id', getRewardByUser);
router.get('/order/:id', getRewardByOrder);
router.post('/', createReward);
router.put('/:id', updateReward);
router.delete('/:id', deleteReward);

export default router;