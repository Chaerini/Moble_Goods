import express from 'express';
import {
  getAllOrderItem,
  getOrderItemById,
  getOrderItemsByOrderId,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem
} from '../controllers/order_item.js';


const router = express.Router();

router.get('/', getAllOrderItem)
router.get('/:id', getOrderItemById);
router.get('/order/:order_id', getOrderItemsByOrderId);
router.post('/', createOrderItem);
router.put('/:id', updateOrderItem);
router.delete('/:id', deleteOrderItem);

export default router;
