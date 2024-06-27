import pool from "../db.js";
export const createImage=async(req,res)=>{
        const {reviewId}=req.params;
        const {image_url}=req.body;
        console.log(image_url);
    try{
        const [result] = await pool.query("INSERT INTO review_image (review_id,image_url) VALUES (?,?)",[reviewId,image_url]);
        res.status(200).json({message:"Image uploaded"})
    }catch(error){
        res.status(400).json({error:error.message});
    }
};