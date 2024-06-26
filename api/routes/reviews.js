import express ,{Router} from "express";
import {createReview,updateReview,deleteReview,getReviewID,getAllReview,createImage} from "../controllers/review.js"
const router = express.Router();

router.post("/",createReview);
router.put("/:reviewId",updateReview);
router.delete("/:reviewId",deleteReview);
router.get("/:reviewId",getReviewID);
router.get("/",getAllReview);
router.post("/:reviewId",createImage);
export default router;
