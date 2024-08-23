import express from 'express'
import {
    getAllColors,
    getColorById,
    createColor,
    updateColor,
    deleteColor
} from '../controllers/colorsController.js';

const router = express.Router();

router.get('/', getAllColors);
router.get('/:id', getColorById);
router.post('/create', createColor);
router.put('/configurate/:id', updateColor);
router.delete('/delete/:id', deleteColor);

export default router;