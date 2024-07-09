import pool from '../db.js';

// 질문 작성
export const createAsk = async (req, res) => {
    const { user_id, title, contents } = req.body;
    try {
        const [result] = await pool.query(
            `INSERT INTO ask (user_id, title, contents, date) VALUES (?, ?, ?, NOW())`,
            [user_id, title, contents]
        );
        let id = result.insertId;
        res.status(200).json({ success: true, id, user_id, title, contents });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 질문 수정
export const updateAsk = async (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE ask SET title = ?, contents = ? WHERE id = ?`,
            [title, contents, id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ id, title, contents });
        } else {
            res.status(404).json({ error: '질문을 찾을 수 없습니다.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 질문 삭제
export const deleteAsk = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            `DELETE FROM ask WHERE id = ?`,
            [id]
        );
        res.status(200).send('질문이 삭제되었습니다.');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 질문 ID 별 조회
export const getAsk = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            `SELECT ask.*, users.name FROM ask JOIN users ON users.id = ask.user_id WHERE ask.id = ?`,
            [id]
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 질문 유저 ID 별 조회
export const getUserAsk = async (req, res) => {
    const { userid } = req.params;

    try {
        const [result] = await pool.query(
            `SELECT ask.*, users.name FROM ask JOIN users ON users.id = ask.user_id WHERE user_id = ? ORDER BY date DESC`,
            [userid]
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// 질문 전체 조회
export const getAsks = async (req, res) => {
    try {
        const [result] = await pool.query(
            `SELECT ask.*, users.name, comment.contents AS comment
            FROM ask JOIN users ON users.id = ask.user_id
            LEFT JOIN comment ON comment.ask_id = ask.id
            ORDER BY date DESC;`
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 관리자
export const getAskNoComment = async (req, res) => {
    try {
        const [result] = await pool.query(
            `SELECT id FROM ask WHERE status=0`
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};