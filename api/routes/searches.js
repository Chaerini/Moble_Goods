import express from "express";
import { searchTitle } from "../controllers/search";
const router = express.Router();
router.get("/search",searchTitle);