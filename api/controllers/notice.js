import pool from "../db.js";

export const createNotice = async(req,res) =>{
    const {userId}=req.params;
    const {title,content}=req.body;
    console.log(req.body);
    try{
        const [result] = await pool.query(`INSERT INTO notice (title,content,user_id) VALUES (?,?,?)`,[title,content,userId]);

        res.status(200).json({message:"공지 등록 완료"});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
export const getAllNotice = async(req,res) => {
    try{
        const [rows] = await pool.query(`SELECT * FROM notice`);
        res.status(200).json({rows});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}