import pool from "../db.js";

export const createReview = async (req, res) => {
    const { userId } = req.params;
    const { product_id, order_id, detail, rating } = req.body;
    console.log(req.body);
    try {
        // userId와 일치하는 username을 조회
        const [userResult] = await pool.query("SELECT name FROM users WHERE id = ?", [userId]);
        if (userResult.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        const name = userResult[0].name;

        // 리뷰 작성
        const [result] = await pool.query(
            "INSERT INTO reviews (product_id, order_id, detail, rating, user_id) VALUES (?, ?, ?, ?, ?)",
            [product_id, order_id, detail, rating, userId]);

        // 생성된 리뷰의 ID
        const reviewId = result.insertId;

        // 응답에 username 포함
        res.status(200).json({ message: "리뷰 작성 완료", "작성자": name, reviewId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


export const updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { detail, rating } = req.body;
    console.log(req.body);
    try {
        const [result] = await pool.query('UPDATE reviews SET detail=?,rating=? WHERE id=?', [detail, rating, reviewId]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "수정 완료" })
        } else {
            res.status(404).json({ error: "Review not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const getReviewID = async (req, res) => {
    const { reviewId } = req.params;
    console.log(req.params);
    try {
        const [rows] = await pool.query("SELECT * FROM reviews WHERE id=?", [reviewId]);
        res.status(201).json({ rows: rows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const getAllReview = async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT
                *
            FROM
                reviews`
        );
        res.status(200).json({ rows: rows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
export const getReviewByUserID = async (req, res) => {
    const { userId } = req.params;
    console.log(req.params);
    try {
        const [result] = await pool.query(
            `SELECT reviews.*, product.id AS product_id, product.name AS product_name, MIN(product_image.url) AS product_image, review_image.image_url AS review_image, users.name AS user_name
            FROM reviews JOIN product ON product.id = reviews.product_id
            LEFT JOIN review_image ON review_image.review_id = reviews.id
            JOIN product_image ON product_image.product_id = product.id
            JOIN users ON reviews.user_id = users.id
            WHERE reviews.user_id = ?
            GROUP BY
            reviews.id, 
            reviews.user_id,
            reviews.order_id,
            reviews.rating,
            reviews.detail,
            reviews.create_date,
            review_image.image_url,
            product.id, 
            product.name
            ORDER BY reviews.create_date DESC;`,
            [userId])
        res.status(201).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteReview = async (req, res) => {
    const { reviewId } = req.params;
    console.log(req.params);
    try {
        const [result] = await pool.query('DELETE FROM reviews WHERE id=?', [reviewId]);
        if (result.affectedRows > 0) {
            res.status(200).json({ message: "삭제 완료" });
        } else {
            res.status(404).json({ error: "Review not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getWritableReview = async (req, res) => {
    const { userId } = req.params;

    try {
        const [result] = await pool.query(
            `SELECT
            \`order\`.id AS order_id,
            \`order\`.user_id AS user_id,
            \`order\`.order_date AS order_date,
            order_item.quantity AS quantity,
            product.id AS product_id,
            product.name AS name,
            MIN(product_image.url) AS image
            FROM \`order\`
            JOIN order_item ON \`order\`.id = order_item.order_id
            JOIN product ON product.id = order_item.product_id
            JOIN product_image ON product_image.product_id = product.id
            JOIN status ON status.id = \`order\`.status_id
            WHERE \`order\`.user_id = ? AND status.delivery_status = "배송완료"
            AND \`order\`.id NOT IN (
                SELECT \`order\`.id
                FROM \`order\`
                JOIN reviews ON reviews.order_id = \`order\`.id
                WHERE \`order\`.user_id = ?
            )
            GROUP BY
                \`order\`.id,
                \`order\`.user_id,
                \`order\`.order_date,
                order_item.quantity,
                product.id,
                product.name
            ORDER BY \`order\`.order_date DESC`,
            [userId, userId]
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}