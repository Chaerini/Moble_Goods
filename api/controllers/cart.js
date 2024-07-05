import pool from '../db.js';
import { verifyTokenNext } from '../utils/verifyToken.js';

// 장바구니 생성
export const createCart = async (req, res) => {
  const { product_id, quantity, checking } = req.body;
  const user_id = req.user.userId; // 현재 로그인된 사용자 ID

  console.log("Received request:", { product_id, quantity, user_id, checking });

  try {
    const [result] = await pool.query(
      `INSERT INTO cart (product_id, quantity, user_id, checking) VALUES (?, ?, ?, ?)`,
      [product_id, quantity, user_id, checking]
    );
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error inserting into cart:", error);
    res.status(400).json({ error: error.message });
  }
};

// 장바구니 수정
export const updateCart = async (req, res) => {
  const { id } = req.params;
  const { quantity, checking } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE cart SET quantity = ?, checking = ? WHERE id = ?`,
      [quantity, checking, id]
    );
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(400).json({ error: error.message });
  }
};

// 장바구니 삭제
export const deleteCart = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      `DELETE FROM cart WHERE id = ?`,
      [id]
    );
    res.status(200).json({ result });
  } catch (error) {
    console.error("Error deleting from cart:", error);
    res.status(400).json({ error: error.message });
  }
};

// 장바구니 조회
export const getCartByUser = async (req, res) => {
  const userId = req.params.userId; // 현재 로그인된 사용자 ID
  console.log(`Fetching cart items for user: ${userId}`);

  try {
    const [result] = await pool.query(
      `SELECT cart.*, product.name, product.discount_rate, product.price, product.discounted_price, product_image.url
      FROM cart 
      JOIN product ON product.id = cart.product_id
      JOIN product_image ON product.id = product_image.product_id
      WHERE cart.user_id = ?`,
      [userId]
    );
    res.status(200).json({ result });
  } catch (error) {
    console.error(`Error fetching cart items for user: ${userId}`, error);
    res.status(400).json({ error: error.message });
  }
};
