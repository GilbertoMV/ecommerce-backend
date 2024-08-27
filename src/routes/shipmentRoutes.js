import express from 'express';
import{
    getAllShipments,
    getShipmentById,
    getShipmentByOrder,
    deleteShipment,
    createShipment,
    updateShipment
} from '../controllers/shipmentController.js';

const router = express.Router();

router.get('/',getAllShipments);
router.get('/:id',getShipmentById);
router.get('/order/:id',getShipmentByOrder);
router.post('/',createShipment);
router.put('/:id',updateShipment);
router.delete('/:id',deleteShipment);

export default router;