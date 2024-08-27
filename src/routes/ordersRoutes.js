import express from 'express'
import {
    getAllOrders,
    getOrderById,
    getOrderByUser,
    deleteOrder,
    createOrder,
    updateOrder
} from '../controllers/orderController.js'

const router = express.Router();

router.get('/', getAllOrders);      
router.get('/:id', getOrderById);
router.get('/me/:id',getOrderByUser);
router.delete('/:id',deleteOrder);
router.post('/',createOrder);
router.put('/:id',updateOrder);

export default router;