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

router.get('/details', getAllOrderDetails);
router.get('/:id/details', getOrderDetailById)
router.get('/order/:id/details', getOrderDetailByOrder);
router.get('/product/:id/details',getOrderDetailByProduct);
router.post('/details', createOrderDetail);
router.put('/:id/details', updateOrderDetail);
router.delete('/:id/details', deleteOrderDetail);

export default router;