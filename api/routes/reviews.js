import express from "express";
import {createReview,updateReview,deleteReview,getReviewID,getAllReview} from "../controllers/review.js"
const router = express.Router();

router.post("/",createReview);
router.put("/:reviewId",updateReview);
router.delete("/:reviewId",deleteReview);
router.get("/:reviewId",getReviewID);
router.get("/",getAllReview);
export default router;
