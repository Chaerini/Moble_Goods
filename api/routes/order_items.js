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

//모든 주문 항목 조회
router.get('/', getAllOrderItem)

// 주문 항목 아이디로 조회 - 특정 주문 항목 아이디에 해당하는 주문 항목을 조회함
router.get('/:id', getOrderItemById);

// 주문 아이디로 주문 항목 조회 - 특정 주문 아이디에 해당하는 모든 주문 항목을 조회함
router.get('/order/:order_id', getOrderItemsByOrderId);

// 주문 항목 추가 - 새로운 주문 항목을 추가함
router.post('/', createOrderItem);

// 주문 항목 업데이트 - 특정 주문 항목 아이디에 해당하는 주문 항목을 업데이트함
router.put('/:id', updateOrderItem);

// 주문 항목 삭제 - 특정 주문 항목 아이디에 해당하는 주문 항목을 삭제함
router.delete('/:id', deleteOrderItem);

export default router;
