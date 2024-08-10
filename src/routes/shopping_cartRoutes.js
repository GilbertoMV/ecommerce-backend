import express from 'express'
import{
 getAllShopping_cart,
 getShopping_cartById,
 getShopping_cartByUser,
 deleteShopping_cart,
 createShopping_cart,
 updateShopping_cart
} from '../controllers/shopping_cartController.js'

const router = express.Router();

router.get('/',getAllShopping_cart);
router.get('/:id',getShopping_cartById);
router.get('/me/:id',getShopping_cartByUser);
router.post('/create',createShopping_cart);
router.delete('/delete/:id',deleteShopping_cart);
router.put('/configurate/:id',updateShopping_cart);

export default router