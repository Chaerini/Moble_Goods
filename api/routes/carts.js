
import express from 'express';
import { createCart, updateCart, deleteCart, getCartByUer } from '../controllers/cart.js';

const router = express.Router('/');

router.post('/', createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);   
router.get('/:userId',  getCartByUer);



export default router;