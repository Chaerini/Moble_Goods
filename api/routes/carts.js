import express from 'express';
import { createCart, updateCart, deleteCart, getCartByUser } from '../controllers/cart.js';
import { verifyTokenNext } from '../utils/verifyToken.js';
import { deleteSelectedCartItems } from '../controllers/cart.js';

const router = express.Router();

router.post('/:userId', verifyTokenNext, createCart);
router.put('/:userId/:id', verifyTokenNext, updateCart);
router.delete('/:userId/:id', verifyTokenNext, deleteCart);  
router.delete('/:userId', verifyTokenNext, deleteSelectedCartItems); 
router.get('/:userId', verifyTokenNext, getCartByUser);

export default router;
