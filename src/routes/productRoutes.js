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
router.post('/', createProduct);     
router.put('/:id', updateProduct); 
router.delete('/:id', deleteProduct);

export default router;
