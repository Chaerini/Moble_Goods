import pool from '../db.js';

// 모든 배송상태와 관련된 주문 항목 조회
export const getAllOrdersWithStatus = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT o.id AS order_id, o.user_id, o.total, s.id AS status_id, s.delivery_status, s.waybill_number
      FROM \`order\` o
      JOIN status s ON o.status_id = s.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//주문항목 아이디로 조회
export const getStatusById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM status WHERE id = ?', [id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//
//운송장 번호로 조회
export const getStatusesByWaybillNumber = async (req, res) => {
  const { waybill_number } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM status WHERE waybill_number = ?', [waybill_number]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//배송상태 추가
export const createStatus = async (req, res) => {
  const { delivery_status, waybill_number } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO status (delivery_status, waybill_number) VALUES (?, ?)', [delivery_status, waybill_number]);
    res.status(201).json({ id: result.insertId, delivery_status, waybill_number });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//배송상태 업데이트
export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { delivery_status, waybill_number } = req.body;
  try {
    await pool.query('UPDATE status SET delivery_status = ?, waybill_number = ? WHERE id = ?', [delivery_status, waybill_number, id]);
    res.json({ id, delivery_status, waybill_number });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//배송상태 삭제
export const deleteStatus = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM status WHERE id = ?', [id]);
    res.json({ message: '삭제 완료 ^오^' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


