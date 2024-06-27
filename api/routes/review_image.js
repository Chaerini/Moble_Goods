import expresss from "express"
import { createImage,updateImage,deleteImage } from "../controllers/review_image.js";
const router = expresss.Router();

router.post("/:reviewId", createImage);
router.put("/:reviewId", updateImage);
router.delete("/:reviewId",deleteImage);
export default router;