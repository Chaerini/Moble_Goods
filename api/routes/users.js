import express from 'express';
import { 
    updateUser,
    updateUserMembership,
    updatePassword,
    deleteUser,
    getIdUser,
    getAllUsers
    } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser, verifyTokenNext } from '../utils/verifyToken.js';

const router = express.Router();

// UPDATE (user)
router.put('/:userId', verifyUser, updateUser);

// UPDATE (admin)
router.put('/membership/:userId', verifyAdmin, updateUserMembership);

// UPDATE (changedPw)
router.put('/changedPw/:userId', verifyUser, updatePassword);

// DELETE
router.delete("/:userId", verifyUser, deleteUser);

// GET ID
router.get("/:userId", verifyUser, getIdUser);

// GET ALL
router.get("/", verifyAdmin, getAllUsers);


export default router;