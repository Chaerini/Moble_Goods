import pool from '../db.js';


// 모든 주문 조회함
export const getAllOrders = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM `order`');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//주문 아이디로 조회 - 특정 주문 아이디에 해당하는 주문을 조회함
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

// 유저 아이디로 조회 - 특정 유저 아이디에 해당하는 모든 주문을 조회함
export const getOrdersByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT o.id AS order_id, o.user_id, o.total, o.order_date, s.delivery_status, s.waybill_number
      FROM \`order\` o
      JOIN status s ON o.status_id = s.id
      WHERE o.user_id = ?
    `, [user_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문 상태 아이디로 조회 - 특정 주문 상태 아이디에 해당하는 모든 주문을 조회함
export const getOrdersByStatusId = async (req, res) => {
  const { status_id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT o.id AS order_id, o.user_id, o.total, o.order_date, s.delivery_status, s.waybill_number
      FROM \`order\` o
      JOIN status s ON o.status_id = s.id
      WHERE o.status_id = ? `, [status_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 배송 상태 ID로 조회 - 특정 배송 상태 ID에 해당하는 모든 주문을 조회합니다.
export const getOrdersByDeliveryStatusId = async (req, res) => {
  const { delivery_status_id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT o.id AS order_id, o.user_id, o.total, o.order_date, s.delivery_status, s.waybill_number
      FROM \`order\` o
      JOIN status s ON o.status_id = s.id
      WHERE s.id = ?
    `, [delivery_status_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 구매 날짜로 조회 - 특정 날짜에 해당하는 모든 주문을 조회함
export const getOrdersByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM `order` WHERE order_date = ?', [date]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문 추가하기 - 새로운 주문을 추가함
export const createOrder = async (req, res) => {
  const { user_id, total, status_id, order_date } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO `order` (user_id, total, status_id, order_date) VALUES (?, ?, ?, ?)', [user_id, total, status_id, order_date]);
    res.status(201).json({ id: result.insertId, user_id, total, status_id, order_date });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문 업데이트 - 특정 주문 아이디에 해당하는 주문을 업데이트함
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { user_id, total, status_id, order_date } = req.body;
  try {
    await pool.query('UPDATE `order` SET user_id = ?, total = ?, status_id = ?, order_date = ? WHERE id = ?', [user_id, total, status_id, order_date, id]);
    res.json({ id, user_id, total, status_id, order_date });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문 삭제 - 특정 주문 아이디에 해당하는 주문을 삭제함
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM `order` WHERE id = ?', [id]);
    res.json({ message: '삭제 완료 ^오^' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

