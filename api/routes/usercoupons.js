import express from 'express';
import { verifyUser } from '../utils/verifyToken.js';
import { createUserCoupon, deleteUserCoupon, getUserCoupon, updateUserCoupon } from '../controllers/usercoupon.js';

const router = express.Router();

// 유저 별 보유 쿠폰 생성
router.post('/', verifyUser, createUserCoupon);

// 유저 별 보유 쿠폰 수정
router.put('/:id', verifyUser, updateUserCoupon);

// 유저 별 보유 쿠폰 삭제
router.delete('/:id', verifyUser, deleteUserCoupon);

// 유저 별 보유 쿠폰 조회
router.get('/:userid', verifyUser, getUserCoupon);

export default router;