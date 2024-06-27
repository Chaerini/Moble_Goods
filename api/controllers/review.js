import pool from "../db.js";
export const createReview = async (req, res) => {
    const { userId } = req.params;
    const { title, detail, rating } = req.body;
    console.log(req.body);
    try {
        // userId와 일치하는 username을 조회
        const [userResult] = await pool.query("SELECT username FROM users WHERE id = ?", [userId]);
        if (userResult.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        const username = userResult[0].username;

        // 리뷰 작성
        const [result] = await pool.query("INSERT INTO reviews (title, detail, rating, user_id) VALUES (?, ?, ?, ?)", [title, detail, rating, userId]);
        
        // 응답에 username 포함
        res.status(200).json({ message: "리뷰 작성 완료", "작성자": username });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const updateReview = async(req,res) =>{
    const {reviewId}=req.params;
    const {detail,rating}=req.body;
    console.log(req.body);
    try{
    const[result]= await pool.query('UPDATE reviews SET detail=?,rating=? WHERE id=?',[detail,rating,reviewId]);
    if(result.affectedRows>0){
        res.status(200).json({message:"수정 완료"})
    }else{
        res.status(404).json({error:"Review not found"});
        }
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
export const getReviewID = async(req,res) =>{
    const {reviewId}=req.params;
    console.log(req.params);
    try{
        const[rows] = await pool.query("SELECT * FROM reviews WHERE id=?",[reviewId]);
        res.status(201).json({rows:rows});
    }catch(error){
        res.status(400).json({error:error.message});
    }
}
export const getAllReview = async(req,res) =>{
    try{
        const [rows] = await pool.query(
            `SELECT
                r.id AS id,
                r.title AS title,
                r.writer AS writer,
                r.detail As detail,
                r.rating As rating
            FROM
                reviews r`
        );
        res.status(200).json({rows:rows});
        }catch(error){
            res.status(400).json({error:error.message});
        }
}
export const getReviewByUserID = async(req,res) =>{
    const{userId}=req.params;
    console.log(req.params);
    try{
        const [result]=await pool.query("SELECT * FROM reviews WHERE user_id=?",[userId])
        if(result.length>0){
            res.status(201).json({result});
        }else{
            res.status(404).json({error:"User not found"});
        }
    }catch(error){
        res.status(400).json({error:error.message});
    }
};
export const deleteReview = async(req,res) =>{
    const {reviewId} = req.params;
    console.log(req.params);
    try{
        const [result] = await pool.query('DELETE FROM reviews WHERE id=?',[reviewId]);
        if(result.affectedRows>0){
            res.status(200).json({message:"삭제 완료"});
        }else{
            res.status(404).json({error:"Review not found"});
        }
    }catch(error){
        res.status(400).json({error:error.message});
    }
}