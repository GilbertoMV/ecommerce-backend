// routes/productRoutes.js
import express from 'express';
import {
  getAllProducts,
  getProductById,
  getProductByCategory,
  getProductByUser,
  deleteProduct,
  createProduct,
  updateProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);            
router.get('/:id', getProductById); 
router.get('/category/:id', getProductByCategory);
router.get('/me/:id', getProductByUser);        
router.post('/', createProduct);     
router.put('/:id', updateProduct); 
router.delete('/:id', deleteProduct);

export default router;
