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
router.put('/users/:userId', verifyUser, updateUser);

// UPDATE (admin)
router.put('/membership/:userId', verifyAdmin, updateUserMembership);

// UPDATE (edit pw)
router.put('/changepw/:userId', verifyAdmin, updatePassword);

// DELETE
router.delete("/:userId", verifyUser, deleteUser);

// GET ID
router.get("/:userId", verifyTokenNext, getIdUser);

// GET ALL
router.get("/", verifyAdmin, getAllUsers);


export default router;