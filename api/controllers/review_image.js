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