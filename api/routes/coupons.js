import express from 'express';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
import { createCoupon, deleteCoupon, getCountCoupon, getCoupon, getCoupons, updateCoupon } from '../controllers/coupon.js';
const router = express.Router();

// 쿠폰 등록
router.post('/', verifyAdmin, createCoupon);

// 쿠폰 수정
router.put('/:id', verifyAdmin, updateCoupon);

// 쿠폰 삭제
router.delete('/:id', verifyAdmin, deleteCoupon);

// 쿠폰 전체 조회
router.get('/', verifyUser, getCoupons);

// 쿠폰 ID 조회
router.get('/:id', verifyAdmin, getCoupon);

// 쿠폰 별 사용 된 횟수
router.get('/count', verifyAdmin, getCountCoupon);

export default router;