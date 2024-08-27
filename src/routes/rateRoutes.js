import express from 'express'
import {
    getAllRates,
    getRateById,
    getRateByUser,
    getRateByProduct,
    createRate,
    updateRate,
    deleteRate
} from '../controllers/rateController.js'

const router = express.Router();

router.get('/', getAllRates);
router.get('/:id', getRateById);
router.get('/me/:id', getRateByUser);
router.get('/product/:id', getRateByProduct);
router.post('/', createRate);
router.put('/:id', updateRate);
router.delete('/:id',deleteRate);

export default router;