import express from "express";
import { 
    getAllAddress,
    getAddressById,
    deleteAddress,
    createAddress,
    updateAddress} from "../controllers/addressController.js";

    const router = express.Router();

    router.get('/',getAllAddress);
    router.get('/:id',getAddressById);
    router.delete('/delete/:id',deleteAddress);
    router.post('/create',createAddress);
    router.put('/configurate/:id',updateAddress);

    export default router;