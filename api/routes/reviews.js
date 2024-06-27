import express from "express";
import {createReview,updateReview,deleteReview,getReviewID,getAllReview, getReviewByUserID} from "../controllers/review.js"
const router = express.Router();

router.post("/:userId",createReview);
router.put("/:reviewId",updateReview);
router.delete("/:reviewId",deleteReview);
router.get("/:reviewId",getReviewID);
router.get("/",getAllReview);
router.get("/user/:userId",getReviewByUserID);
export default router;
