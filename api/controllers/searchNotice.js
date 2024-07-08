import pool from "../db.js";
export const searchNoticetitle = async (req, res) => {
    const { title} = req.query;
    console.log("title",title);
    try {
        const [result] = await pool.query(
            `SELECT * FROM notices WHERE title LIKE ?`,
            [`%${title}%`]
        );
        if (result.length > 0) {
            res.status(200).json({ result });
        } else {
            res.status(404).json({ error: 'Notice not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
