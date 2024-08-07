import express from 'express';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
import { createCoupon, deleteCoupon, getCountCoupon, getCoupon, getCoupons, getNotUserCoupons, updateCoupon } from '../controllers/coupon.js';
const router = express.Router();

// 쿠폰 등록
router.post('/', createCoupon);

// 쿠폰 수정
router.put('/:id', updateCoupon);

// 쿠폰 삭제
router.delete('/:id', deleteCoupon);

// 쿠폰 전체 조회
router.get('/', getCoupons);

// 유저가 발급 받지 않은 쿠폰 전체 조회
router.get('/not/:id', getNotUserCoupons);

// 유저가 발급 받지 않은 쿠폰 개수 조회
router.get('/not/count/:id', getNotUserCoupons);

// // 유저가 발급받은 쿠폰 조회
// router.get('/user/:userId', getUserCoupons);

// 쿠폰 ID 조회
router.get('/:id', verifyAdmin, getCoupon);

// 쿠폰 별 사용 된 횟수
router.get('/count', verifyAdmin, getCountCoupon);

export default router;