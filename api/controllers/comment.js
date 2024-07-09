import pool from '../db.js';

// 1:1 문의 답변 작성
export const createComment = async (req, res) => {
    // 답변 작성 날짜를 현재 날짜로 하기 위함
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 9);
    const date = currentDate.toISOString().slice(0, 10);

    const { admin_id, ask_id, contents } = req.body;

    try {
        const [result] = await pool.query(
            `INSERT INTO comment(admin_id, ask_id, contents, date) VALUES (?, ?, ?, ?);`,
            [admin_id, ask_id, contents, date]
        );
        let id = result.insertId;
        res.status(200).json({ success: true, id, admin_id, ask_id, contents, date });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

// 1:1 문의 답변 수정
export const updateComment = async (req, res) => {
    const { id } = req.params;
    const { contents } = req.body;

    try {
        const [result] = await pool.query(
            `UPDATE comment SET contents = ? WHERE id = ?`,
            [contents, id]
        );
        if (result.affectedRows > 0) {
            res.status(200).json({ id, contents });
        } else {
            res.status(404).json({ error: '댓글을 찾을 수 없습니다.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 1:1 문의 답변 삭제
export const deleteComment = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query(
            `DELETE FROM comment WHERE id = ?;`,
            [id]
        );
        res.status(200).send('댓글이 삭제되었습니다.');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// 1:1 문의 답변 질문 별 조회
export const getComment = async (req, res) => {
    const { askid } = req.params;

    try {
        const [result] = await pool.query(
            `SELECT comment.*, users.name FROM comment JOIN users ON users.id = comment.admin_id WHERE comment.ask_id = ?`,
            [askid]
        );
        res.status(200).json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};