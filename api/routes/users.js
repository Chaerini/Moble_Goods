import express from 'express';
import { 
    updateUser,
    updateUserMembership,
    updatePassword,
    deleteUser,
    getIdUser,
    getAllUsers,
    updateUserAdmin
    } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser, verifyTokenNext } from '../utils/verifyToken.js';

const router = express.Router();

// UPDATE (user)
router.put('/:userId', updateUser);

//UPDATE (useradmin)

router.put("/admin/:userId",updateUserAdmin);

// UPDATE (admin)
router.put('/membership/:userId', updateUserMembership);

// UPDATE (changedPw)
router.put('/changedPw/:userId', updatePassword);

// DELETE
router.delete("/:userId", deleteUser);

// GET ID
router.get("/:userId", getIdUser);

// GET ALL
router.get("/", getAllUsers);


export default router;