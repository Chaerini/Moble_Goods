import pool from "../db.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // uploads 폴더에 파일 저장
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // 파일명 설정
    }
});

const upload = multer({ storage: storage }).single('image');

// export const createImage=async(req,res)=>{
//         const {reviewId}=req.params;
//         const {image_url}=req.body;
//         console.log(image_url);
//     try{
//         const [result] = await pool.query("INSERT INTO review_image (review_id,image_url) VALUES (?,?)",[reviewId,image_url]);
//         res.status(200).json({message:"Image uploaded"})
//     }catch(error){
//         res.status(400).json({error:error.message});
//     }
// };

export const createImage = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        const { reviewId } = req.params;
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        if (!image_url) {
            return res.status(400).json({ error: "No image provided" });
        }

        try {
            const [result] = await pool.query(
                "INSERT INTO review_image (review_id, image_url) VALUES (?, ?)",
                [reviewId, image_url]
            );
            res.status(200).json({ message: "Image uploaded", image_url });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};


export const updateImage = async(req,res) =>{
    const {reviewId}=req.params;
    const {image_url} = req.body;
    console.log(req.body);
    try{
        const [result] = await pool.query("UPDATE review_image SET image_url=? WHERE review_id=?",[image_url,reviewId])
        res.status(200).json({message:"수정 완료"})
    }catch(error){
        res.status(400).json({error:error.message})
    }
};
export const deleteImage = async(req,res) =>{
    const {reviewId} = req.params;
    try{
        const [result] = await pool.query("DELETE FROM review_image WHERE review_id=?",[reviewId])
        res.status(200).json({message:"삭제 완료"})
    }catch(error){
        res.status(400).json({error:error.message});
    }
}