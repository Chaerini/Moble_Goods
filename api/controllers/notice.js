import pool from "../db.js";

export const createNotice = async(req,res) =>{
    const {userId}=req.params;
    const {title,content}=req.body;
    console.log(req.body);
    try{
        const [rows] = await pool.query(`INSERT INTO notice (title,content,user_id) VALUES (?,?,?)`,[title,content,userId]);

        res.status(200).json({message:"공지 등록 완료"});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
export const updateNotice = async(req,res) => {
    const {noticeId} = req.params;
    const {title,content}=req.body;
    console.log(req.body);
    console.log(req.params);
    try{
        const [rows] = await pool.query(`UPDATE notice SET title=?,content=? WHERE id=?`,[title,content,noticeId]);
        res.status(200).json({message:"수정 완료"})
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
export const deleteNotice = async(req,res) => {
    const {noticeId} = req.params;
    console.log(req.params);
    try{
        const [rows] = await pool.query(`DELETE FROM notice WHERE id=?`,[noticeId]);
        res.status(200).json({message:"삭제 완료"})
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
export const getAllNotice = async(req,res) => {
    try{
        console.log("======getAllNotice=========");
        const [rows] = await pool.query(`SELECT * FROM notice`);

        console.log(rows);
        res.status(200).json({rows});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
export const getNoticeById = async(req,res) => {
    const {noticeId} =req.params;
    try{
        const [result] = await pool.query(`SELECT * FROM notice WHERE id=?`,[noticeId]);
        res.status(200).json({result});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}