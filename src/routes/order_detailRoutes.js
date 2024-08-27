import express from 'express';
import {
    getAllOrderDetails,
    getOrderDetailById,
    getOrderDetailByOrder,
    getOrderDetailByProduct,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
} from '../controllers/order_detailController.js';

const router = express.Router();

router.get('/', getAllOrderDetails);
router.get('/:id', getOrderDetailById)
router.get('/product/:id',getOrderDetailByProduct);
router.get('/order/:id', getOrderDetailByOrder);
router.post('/create', createOrderDetail);
router.put('/configurate/:id', updateOrderDetail);
router.delete('/delete/:id', deleteOrderDetail);

export default router;