import pool from '../db.js';

// 쿠폰 등록
export const createCoupon = async (req, res) => {
    const { name, discount, startdate, enddate, condition } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO coupon(name, discount, startdate, enddate, condition) VALUES (?, ?, ?, ?, ?)`,
            [name, discount, startdate, enddate, condition]
        );
        let id = result.insertId;
        res.status(200).json({ id, name, discount, startdate, enddate, condition });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 쿠폰 수정
export const updateCoupon = async (req, res) => {
    const { id } = req.params;
    const { name, discount, startdate, enddate, condition } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE coupon 
            SET name = ?, discount = ?, startdate = ?, enddate = ? , condition = ?
            WHERE id = ?`,
            [name, discount, startdate, enddate, condition, id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ id, name, discount, startdate, enddate, condition });
        } else {
            res.status(404).json({ error: '쿠폰을 찾을 수 없습니다.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 쿠폰 삭제
export const deleteCoupon = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            `DELETE FROM coupon WHERE id = ?`,
            [id]
        );
        res.status(200).send('쿠폰이 삭제되었습니다.');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 쿠폰 전체 조회
export const getCoupons = async (req, res) => {
    try {
        const [result] = await pool.query(
            `SELECT * FROM coupon`
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 쿠폰 ID 조회
export const getCoupon = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            `SELECT * FROM coupon WHERE id = ?`,
            [id]
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 하나의 쿠폰 당 사용 된 횟수
export const getCountCoupon = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            `SELECT coupon.name, COUNT(*) FROM usercoupon
            JOIN usercoupon ON coupon.id = usercoupon.coupon_id
            WHERE coupon.id = ? AND usercoupon.used = 1`,
            [id]
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}