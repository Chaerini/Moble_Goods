import pool from '../db.js';

//주문항목 아이디로 조회
export const getOrderItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM order_item WHERE id = ?', [id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문 아이디로 조회 
export const getOrderItemsByOrderId = async (req, res) => {
    const { order_id } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM order_item WHERE order_id = ?', [order_id]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

//주문항목 추가
export const createOrderItem = async (req, res) => {
  const { order_id, quantity, product_id, price } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO order_item (order_id, quantity, product_id, price) VALUES (?, ?, ?, ?)', [order_id, quantity, product_id, price]);
    res.status(201).json({ id: result.insertId, order_id, quantity, product_id, price });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//주문항목 업데이트
export const updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const { order_id, quantity, product_id, price } = req.body;
  try {
    await pool.query('UPDATE order_item SET order_id = ?, quantity = ?, product_id = ?, price = ? WHERE id = ?', [order_id, quantity, product_id, price, id]);
    res.json({ id, order_id, quantity, product_id, price });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문항목 삭제
export const deleteOrderItem = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM order_item WHERE id = ?', [id]);
    res.json({ message: '삭제완료 ^오^' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
