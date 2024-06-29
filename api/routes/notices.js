import express from "express";

import { createNotice } from "../controllers/notice.js";

const router=express.Router();

router.post("/:userId",createNotice);
export default router;