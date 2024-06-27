import pool from '../db.js';

export const createProduct = async ( req, res ) => {
    const { name, quantity, SubCategory_id, discount_rate, price, date } = req.body;

    let discounted_price;
    if (discount_rate == 0) {
        discounted_price = price;
    } else {
        discounted_price = Math.round(price * (1 - discount_rate / 100));
    }
    try {
        const [result] = await pool.query(
            'INSERT INTO product (name, quantity, SubCategory_id, discount_rate, price, discounted_price, date) VALUES (?, ?, ?, ?, ?, ?, NOW())',
            [name, quantity, SubCategory_id, discount_rate, price, discounted_price, date]
        );
        
        res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};
 
