import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createComment, deleteComment, getComment, updateComment } from '../controllers/comment.js';

const router = express.Router();

// 1:1 문의 답변 작성
router.post('/', createComment);

// 1:1 문의 답변 수정
router.put('/:id', updateComment);

// 1:1 문의 답변 삭제
router.delete('/:id', deleteComment);

// 1:1 문의 답변 질문 별 조회
router.get('/:askid', getComment);

export default router;
