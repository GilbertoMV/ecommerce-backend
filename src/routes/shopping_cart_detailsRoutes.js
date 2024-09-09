import express from 'express'
import {
    getAllCartDetails,
    getCartDetailById,
    getCartDetailByCart,
    getCartDetailByProduct,
    createCartDetail,
    updateCartDetail,
    deleteCartDetail
} from '../controllers/shopping_cart_detailsController.js'

const router = express.Router();

router.get('/details', getAllCartDetails);
router.get('/:id/details', getCartDetailById);
router.get('/cart/:id/details', getCartDetailByCart);
router.get('/product/:id/details', getCartDetailByProduct);
router.post('/details', createCartDetail);
 router.put('/:id/details', updateCartDetail);
 router.delete('/:id/details', deleteCartDetail);

 export default router;