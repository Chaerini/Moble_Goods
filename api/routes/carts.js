
import express from 'express';
import { createCart, updateCart, deleteCart, getCartByUer } from '../controllers/cart';

const router = express.Router('/');
Node-Node.js

router.post('/', createCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);   
router.get('/:userId',  getCartByUer);



export default router;