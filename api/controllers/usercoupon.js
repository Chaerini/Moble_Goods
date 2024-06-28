import pool from '../db.js';

// 유저 별 보유 쿠폰 생성
export const createUserCoupon = async (req, res) => {
    const { coupon_id, user_id } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO usercoupon(coupon_id, user_id) VALUES (?, ?)`,
            [coupon_id, user_id]
        );
        let id = result.insertId;
        res.status(200).json({ id, coupon_id, user_id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 유저 별 보유 쿠폰 수정
export const updateUserCoupon = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE usercoupon SET status = ? WHERE id = ?`,
            [status, id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ id, status });
        } else {
            res.staus(404).json({ error: '유저 쿠폰함을 찾을 수 없습니다.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// 유저 별 보유 쿠폰 삭제
export const deleteUserCoupon = async (req, res) => {
    const { id } = req.body;

    try {
        const [result] = await pool.query(
            `DELETE FROM usercoupon WHERE id = ?`,
            [id]
        );
        res.status(200).send('유저의 쿠폰이 삭제되었습니다.');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 유저 별 보유 쿠폰 조회
export const getUserCoupon = async (req, res) => {
    const { userid } = req.userid;

    try {
        const [result] = await pool.query(
            `SELECT * FROM usercoupon WHERE user_id = ?`,
            [userid]
        );
        res.stauts(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};