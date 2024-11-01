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
router.delete('/:id', deleteHistoryOrder);
router.post('/',createHistoryOrder);
router.put('/:id',updateHistoryOrder);

export default router;