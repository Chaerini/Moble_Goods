import pool from '../db.js';

// 모든 대분류 조회
export const getAllMainCategories = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM maincategory');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving main categories', error: error.message });
    }
};

// 모든 중분류 조회
export const getAllSubcategories = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM subcategory');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving subcategories', error: error.message });
    }
};

// 특정 대분류의 중분류 조회
export const getSubcategoriesByMainCategory = async (req, res) => {
    const { maincategory_id } = req.query;
    try {
        const [rows] = await pool.query('SELECT * FROM subcategory WHERE maincategory_id = ?', [maincategory_id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving subcategories', error: error.message });
    }
};
