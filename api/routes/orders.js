import express from 'express';
import {
     getAllOrders,
     getOrderById, 
     getOrdersByStatusId, 
     getOrdersByUserId, 
     createOrder, 
     updateOrder, 
     deleteOrder,
     getOrdersByDate,
     getOrdersByDeliveryStatusId
} from '../controllers/order.js';

const router = express.Router();


// 모든 주문 조회 - 모든 주문을 조회함
router.get('/', getAllOrders);

// 주문 아이디로 조회 - 특정 주문 아이디에 해당하는 주문을 조회함
router.get('/:id', getOrderById);

// 유저 아이디로 조회 - 특정 유저 아이디에 해당하는 모든 주문을 조회함
router.get('/user/:user_id', getOrdersByUserId);

// 주문 상태 아이디로 조회 - 특정 주문 상태 아이디에 해당하는 모든 주문을 조회함
router.get('/status/:status_id', getOrdersByStatusId);

// 구매 날짜로 조회 - 특정 날짜에 해당하는 모든 주문을 조회함
router.get('/date/:date', getOrdersByDate);

// 배송 상태 ID로 조회 - 특정 배송 상태 ID에 해당하는 모든 주문을 조회함
router.get('/delivery_status/:delivery_status_id', getOrdersByDeliveryStatusId);

// 주문 추가하기 - 새로운 주문을 추가함
router.post('/', createOrder);

// 주문 업데이트 - 특정 주문 아이디에 해당하는 주문을 업데이트함
router.put('/:id', updateOrder);

// 주문 삭제하기 - 특정 주문 아이디에 해당하는 주문을 삭제함
router.delete('/:id', deleteOrder);

export default router;