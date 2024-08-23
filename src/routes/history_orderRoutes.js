import express from 'express';
import {
    getAllHistoryOrders,
    getHistoryOrderById,
    getHistoryOrderByProduct,
    getHistoryOrderByUser,
    createHistoryOrder,
    updateHistoryOrder,
    deleteHistoryOrder
} from '../controllers/history_orderController.js';

const router = express.Router();

router.get('/', getAllHistoryOrders);
router.get('/:id',getHistoryOrderById)
router.get('/me/:id', getHistoryOrderByUser);
router.get('/order/:id',getHistoryOrderByProduct);
router.delete('/delete/:id', deleteHistoryOrder);
router.post('/create',createHistoryOrder);
router.put('/configurate/:id',updateHistoryOrder);

export default router;