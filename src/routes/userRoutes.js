// routes/userRoutes.js
import express from 'express';
import { 
    getAllUsers, 
    getUserById, 
    deleteUser, 
    updateUser, 
    getUserInfo
} from '../controllers/userController.js';

const router = express.Router();

router.get("/", getAllUsers);
router.get("/me", getUserInfo);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;
