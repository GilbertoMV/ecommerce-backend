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

router.get('/', getAllProducts);            // Ruta para obtener todos los productos
router.get('/:id', getProductById);         // Ruta para obtener un producto por su ID
router.delete('/delete/:id', deleteProduct); // Ruta para eliminar un producto por su ID
router.post('/create', createProduct);      // Ruta para crear un nuevo producto
router.put('/configurate/:id', updateProduct); // Ruta para actualizar un producto por su ID

export default router;
