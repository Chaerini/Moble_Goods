import express from "express";
import {
  getAdminAllOrders,
  getAllOrders,
  getOrderById,
  getOrdersByStatusId,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByDate,
  getOrdersByDeliveryStatusId,
  getOrdersByUserIdDate,
  getOrdersByCount,
} from "../controllers/order.js";

const router = express.Router();

// 관리자 - 전체 주문내역 조회
router.get("/admin", getAdminAllOrders);

// 모든 주문 조회
router.get("/", getAllOrders);

// 주문 아이디로 조회
router.get("/:id", getOrderById);

// 유저 아이디로 조회
router.get("/user/:user_id", getOrdersByUserId);

// 특정 날짜의 유저 아이디로 조회
router.get("/user/date/:user_id", getOrdersByUserIdDate);

// 주문 별 아이템 개수 조회
router.get("/count/:user_id/:order_id", getOrdersByCount);

// 주문 상태 아이디로 조회
router.get("/status/:status_id", getOrdersByStatusId);

// 구매 날짜로 조회
router.get("/date/:date", getOrdersByDate);

// 배송 상태 ID로 조회
router.get("/delivery_status/:delivery_status_id", getOrdersByDeliveryStatusId);

// 주문 추가하기
router.post("/", createOrder);

// 주문 업데이트
router.put("/:id", updateOrder);

// 주문 삭제하기
router.delete("/:id", deleteOrder);

export default router;
