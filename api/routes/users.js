import express from 'express';
import { 
    updateUser,
    updateUserMembership,
    editPassword,
    deleteUser,
    getIdUser,
    getAllUsers
    } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// UPDATE (user)
router.put('/users/:userId', verifyUser, updateUser);

// UPDATE (admin)
router.put('/membership/:userId', verifyAdmin, updateUserMembership);

// UPDATE (edit pw)
router.put('/changepw/:userId', verifyAdmin, editPassword);

// DELETE
router.delete("/:userId", verifyUser, deleteUser);

// GET ID
router.get("/:userId", verifyUser, getIdUser);

// GET ALL
router.get("/", verifyAdmin, getAllUsers);


export default router;