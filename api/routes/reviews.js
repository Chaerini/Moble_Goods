import express from "express";
import { createReview, updateReview, deleteReview, getReviewID, getAllReview, getReviewByUserID, getWritableReview } from "../controllers/review.js"
const router = express.Router();

router.post("/:userId", createReview);
router.put("/:reviewId", updateReview);
router.delete("/:reviewId", deleteReview);
router.get("/:reviewId", getReviewID);
router.get("/", getAllReview);
router.get("/user/:userId", getReviewByUserID);
router.get('/writable/:userId', getWritableReview);
export default router;
