// routes/productRoutes.js
import express from 'express';
import {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);            
router.get('/:id', getProductById);         
router.delete('/delete/:id', deleteProduct);
router.post('/create', createProduct);     
router.put('/configurate/:id', updateProduct); 

export default router;
