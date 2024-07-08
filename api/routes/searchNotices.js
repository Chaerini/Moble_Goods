import express from "express";
import { searchNoticetitle } from "../controllers/searchNotice.js";
const router = express.Router();
router.get(`/`,searchNoticetitle);
export default router;