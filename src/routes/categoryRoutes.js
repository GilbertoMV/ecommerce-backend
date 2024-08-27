// routes/categoryRoutes.js
import express from 'express';
import {
  getAllCategories,
  getCategoryById,
  deleteCategory,
  createCategory,
  updateCategory
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getAllCategories);             
router.get('/:id', getCategoryById);            
router.delete('/:id', deleteCategory);   
router.post('/', createCategory);        
router.put('/:id', updateCategory); 

export default router;
