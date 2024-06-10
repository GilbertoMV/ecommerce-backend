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
router.delete('/delete/:id', deleteCategory);   
router.post('/create', createCategory);        
router.put('/configurate/:id', updateCategory); 

export default router;
