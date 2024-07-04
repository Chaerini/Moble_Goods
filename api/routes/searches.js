import express from "express";
import { searchTitle } from "../controllers/search.js";
const router = express.Router();
router.get("/search",searchTitle);