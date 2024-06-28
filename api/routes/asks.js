import express from 'express';
import { verifyAdmin, verifyToken, verifyTokenNext, verifyUser } from '../utils/verifyToken.js';
import { createAsk, deleteAsk, getAsk, getAsks, getUserAsk, updateAsk } from '../controllers/ask.js';

const router = express.Router();

// 질문 등록
router.post('/', verifyTokenNext, createAsk);

// 질문 수정
router.put('/:id', verifyTokenNext, updateAsk);

// 질문 삭제
router.delete('/:id', verifyTokenNext, deleteAsk);

// 질문 전체 조회
router.get('/', verifyTokenNext, getAsks);

// 질문 유저 ID 별 조회
router.get('/user/:userid', verifyTokenNext, getUserAsk);

// 질문 ID 별 조회
router.get('/:id', verifyTokenNext, getAsk);



export default router;