import express from "express";

import { createNotice,getAllNotice } from "../controllers/notice.js";

const router=express.Router();

router.post("/",createNotice);
router.get("/",getAllNotice);
export default router;