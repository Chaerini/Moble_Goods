import express from "express";
import { searchUserName } from "../controllers/searchUser.js";
const router = express.Router();
router.get(`/name`,searchUserName);
export default router;