import express from 'express';
import{
    getAllShipments,
    getShipmentById,
    deleteShipment,
    createShipment,
    updateShipment
} from '../controllers/shipmentController.js';

const router = express.Router();

router.get('/',getAllShipments);
router.get('/:id',getShipmentById);
router.delete('/delete/:id',deleteShipment);
router.post('create',createShipment);
router.put('/configurate/:id',updateShipment);

export default router;