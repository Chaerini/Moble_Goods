import expresss from "express"
import { createImage } from "../controllers/review_image.js";
const router = expresss.Router();

router.post("/:reviewId", createImage);

export default router;