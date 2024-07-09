import pool from '../db.js';

// 쿠폰 등록
export const createCoupon = async (req, res) => {
    const { name, discount, start_date, end_date, conditions } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO coupon(name, discount, start_date, end_date, conditions) VALUES (?, ?, ?, ?, ?)`,
            [name, discount, start_date, end_date, conditions]
        );
        let id = result.insertId;
        res.status(200).json({ id, name, discount, start_date, end_date, conditions });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 쿠폰 수정
export const updateCoupon = async (req, res) => {
    const { id } = req.params;
    const { name, discount, start_date, end_date, conditions } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE coupon 
            SET name = ?, discount = ?, start_date = ?, end_date = ? , conditions = ?
            WHERE id = ?`,
            [name, discount, start_date, end_date, conditions, id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ id, name, discount, start_date, end_date, conditions });
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
            `SELECT * FROM coupon WHERE DATE(end_date) >= CURDATE()`
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

// 쿠폰 당 사용 된 횟수
export const getCountCoupon = async (req, res) => {
    try {
        const [result] = await pool.query(
            `SELECT coupon.id, coupon.name, COUNT(*) AS coupon_used_count FROM coupon
            JOIN usercoupon ON coupon.id = usercoupon.coupon_id
            WHERE usercoupon.used = 1
            GROUP BY coupon.id;`
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// 유저가 발급 받지 않은 쿠폰 전체 조회
export const getNotUserCoupons = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            `SELECT coupon.*
            FROM coupon LEFT JOIN usercoupon ON coupon.id = usercoupon.coupon_id
            WHERE DATE(end_date) >= CURDATE()
            AND coupon.id NOT IN(
            SELECT coupon_id FROM usercoupon WHERE user_id = ?);`,
            [id]
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 유저가 발급 받지 않은 쿠폰 개수 조회
export const getNotUserCouponCount = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            `SELECT COUNT(*)
            FROM coupon LEFT JOIN usercoupon ON coupon.id = usercoupon.coupon_id
            WHERE DATE(end_date) >= CURDATE()
            AND coupon.id NOT IN(
            SELECT coupon.id
            FROM coupon JOIN usercoupon ON usercoupon.coupon_id = coupon.id 
            WHERE usercoupon.user_id = ?);`,
            [id]
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 유저가 발급받은 쿠폰 조회
// export const getUserCoupons = async (req, res) => {
//     const { userId } = req.params;

//     console.log("Received request to get user coupons for userId:", userId); // 디버깅 로그 추가

//     try {
//         const [result] = await pool.query(
//             `SELECT coupon.id, coupon.name, coupon.discount, coupon.start_date, coupon.end_date, coupon.conditions
//              FROM coupon
//              JOIN usercoupon ON coupon.id = usercoupon.coupon_id
//              WHERE usercoupon.user_id = ? AND usercoupon.used = 0
//              AND DATE(coupon.end_date) >= CURDATE()`,
//             [userId]
//         );

//         console.log("Query result:", result); // 디버깅 로그 추가

//         res.status(200).json({ result });
//     } catch (error) {
//         console.error("Error occurred while fetching user coupons:", error); // 디버깅 로그 추가
//         res.status(400).json({ error: error.message });
//     }
// };