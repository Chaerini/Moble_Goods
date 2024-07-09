import express from 'express';
import { verifyAdmin, verifyToken, verifyTokenNext, verifyUser } from '../utils/verifyToken.js';
import { createAsk, deleteAsk, getAsk, getAsks, getUserAsk, updateAsk, getAskNoComment } from '../controllers/ask.js';

const router = express.Router();

// 질문 등록
router.post('/', createAsk);

// 질문 수정
router.put('/:id', updateAsk);

// 질문 삭제
router.delete('/:id', deleteAsk);

// 질문 전체 조회
router.get('/', getAsks);

// 질문 유저 ID 별 조회
router.get('/user/:userid', getUserAsk);

// 질문 ID 별 조회
router.get('/:id', getAsk);

// 관리자 - 미답변 질문 조회
router.get('/admin/nocomment', getAskNoComment);



export default router;