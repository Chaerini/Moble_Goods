import pool from '../db.js';


// 모든 주문 조회
export const getAllOrders = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM `order`');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//주문 아이디로 조회
export const getOrderById = async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(`
        SELECT o.id AS order_id, o.user_id, o.total, s.delivery_status, s.waybill_number
        FROM \`order\` o
        JOIN status s ON o.status_id = s.id
        WHERE o.id = ?`, [id]);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

//유저 아이디로 조회
export const getOrdersByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM `order` WHERE user_id = ?', [user_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문 추가하기
export const createOrder = async (req, res) => {
  const { user_id, total, status_id } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO `order` (user_id, total, status_id) VALUES (?, ?, ?)', [user_id, total, status_id]);
    res.status(201).json({ id: result.insertId, user_id, total, status_id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//주문 업데이트
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { user_id, total, status_id } = req.body;
  try {
    await pool.query('UPDATE `order` SET user_id = ?, total = ?, status_id = ? WHERE id = ?', [user_id, total, status_id, id]);
    res.json({ id, user_id, total, status_id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//주문 삭제
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM `order` WHERE id = ?', [id]);
    res.json({ message: '삭제 완료 ^오^' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//주문 상태 아이디로 조회
export const getOrdersByStatusId = async (req, res) => {
  const { status_id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT o.id AS order_id, o.user_id, o.total, s.delivery_status, s.waybill_number
      FROM \`order\` o
      JOIN status s ON o.status_id = s.id
      WHERE o.status_id = ?
    `, [status_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
