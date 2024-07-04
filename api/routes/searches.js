import express from "express";
import { searchName } from "../controllers/search.js";
const router = express.Router();
router.get(`/name`,searchName);
export default router;