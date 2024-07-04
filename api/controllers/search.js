import pool from "../db.js";
export const searchName = async (req, res) => {
    const { name} = req.query;
    console.log("name",name);
    try {
        const [result] = await pool.query(
            `SELECT * FROM product WHERE name LIKE ?`,
            [`%${name}%`]
        );
        if (result.length > 0) {
            res.status(200).json({ result });
        } else {
            res.status(404).json({ error: 'Users not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const searchUserName = async (req, res) => {
    const { name} = req.query;
    console.log("name",name);
    try {
        const [result] = await pool.query(
            `SELECT * FROM users WHERE name LIKE ?`,
            [`%${name}%`]
        );
        if (result.length > 0) {
            res.status(200).json({ result });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};