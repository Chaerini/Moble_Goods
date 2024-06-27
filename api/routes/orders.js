import express from 'express';
import { getOrderById, getOrdersByStatusId, getOrdersByUserId, createOrder, updateOrder, deleteOrder } from '../controllers/order.js';

const router = express.Router();

router.get('/:id', getOrderById);
router.get('/user/:user_id', getOrdersByUserId);
router.get('/status/:status_id', getOrdersByStatusId);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);


export default router;
