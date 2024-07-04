import express from 'express';
import { createCart, updateCart, deleteCart, getCartByUser } from '../controllers/cart.js';
import { verifyTokenNext } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyTokenNext, createCart);
router.put('/:id', verifyTokenNext, updateCart);
router.delete('/:id', verifyTokenNext, deleteCart);   
router.get('/', verifyTokenNext, getCartByUser);

export default router;
