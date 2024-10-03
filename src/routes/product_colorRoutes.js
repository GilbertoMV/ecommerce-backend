import expres from 'express';
import {
    getAllProductColor,
    getProductColorByProduct,
    createProductColor,
    deleteProductColor
} from '../controllers/product_colorController.js';

const router = expres.Router();

router.get('/products', getAllProductColor);
router.get('/products/:id', getProductColorByProduct);
router.post('/products', createProductColor);
router.delete('/:id_color/products/:id_producto', deleteProductColor);

export default router;