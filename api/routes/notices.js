import express from "express";

import { createNotice,deleteNotice,getAllNotice, updateNotice,getNoticeById } from "../controllers/notice.js";

const router=express.Router();

router.post("/",createNotice);
router.put("/:noticeId",updateNotice);
router.delete('/:noticeId',deleteNotice);
router.get("/",getAllNotice);
router.get("/:noticeId",getNoticeById);
export default router;