import pool from '../db.js';   

// 장바구니 생성
export const createCart = async (req, res) => {
  const { product_id, quantity, user_id } = req.body;

  try{
    const [result] = await pool.query (
      `INSERT INTO cart (product_id, quantity, user_id) VALUES (?, ?, ?)`,
      [product_id, quantity, user_id]
    );
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 장바구니 수정
export const updateCart = async (req, res) => {
  const { id } = req.params;
  const {quantity} = req.body;

  try{
    const [result] = await pool.query (
      `UPDATE cart SET quantity = ?, WHERE id = ?`,
      [quantity, id] 
    );
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 장바구니 삭제
export const  deleteCart = async (req, res) => {
  const { id } = req.params;

  try{
    const [result] = await pool.query (
      `DELETE FROM cart WHERE id = ?`,
      [id]
    );
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// 장바구니 조회
export const getCartByUer = async (req, res) => {
  const { userId } = req.params;

  try{
    const [result] = await pool.query (
      `SELECT cart.*, product.name, product.discount_rate, product.price, product.discounted_price, product_image.url
      FROM cart JOIN product ON product.id = cart.product_id
      JOIN product_image ON product.id = product_image.product_id
      WHERE user_id = ?`,
      [userId]
    );
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};