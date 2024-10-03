import express from 'express';
import {
    getAllProductSize,
    //getProductSizeBySize,
    getProductSizeByProduct,
    createProductSize,
    updateProductSize,
    deleteProductSize
} from '../controllers/product_sizeController.js';

const router = express.Router();

router.get('/products', getAllProductSize);
router.get('/products/:id', getProductSizeByProduct);
/* TODO: No es necesario por el momento
router.get('/:id/products/sizes', getProductSizeBySize);*/
router.post('/products', createProductSize);
router.put('/:id_talla/products/:id_producto', updateProductSize);
router.delete('/:id_talla/products/:id_producto', deleteProductSize);

 export default router;