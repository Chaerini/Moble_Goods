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
      SELECT 
      \`order\`.id,
      MAX(\`order\`.user_id) AS user_id,
      MAX(\`order\`.total) AS total,
      MAX(\`order\`.status_id) AS status_id,
      MAX(\`order\`.order_date) AS order_date,
      MAX(order_item.id) AS orderitem_id,
      MAX(order_item.quantity) AS quantity,
      MAX(status.delivery_status) AS delivery_status, 
      MAX(status.waybill_number) AS waybill_number, 
      MAX(product.id) AS product_id, 
      MAX(product.name) AS name, 
      MAX(product_image.url) AS product_image_url
      FROM \`order\`
      JOIN order_item ON order_item.order_id = \`order\`.id
      JOIN status ON status.id = \`order\`.status_id
      JOIN product ON product.id = order_item.product_id
      JOIN product_image ON product_image.product_id = product.id
      WHERE \`order\`.user_id = ?
      GROUP BY \`order\`.id;
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
  const { user_id, total, delivery_status, order_date, items } = req.body;

  try {
    // status 테이블에서 delivery_status로 status_id 가져오기
    const [statusResult] = await pool.query('SELECT id FROM status WHERE delivery_status = ?', [delivery_status]);

    // 상태가 없으면 추가하고 ID 가져오기
    let status_id;
    if (statusResult.length === 0) {
      const [insertStatusResult] = await pool.query('INSERT INTO status (delivery_status) VALUES (?)', [delivery_status]);
      status_id = insertStatusResult.insertId;
    } else {
      status_id = statusResult[0].id;
    }

    // order 테이블에 주문 데이터 삽입
    const [orderResult] = await pool.query('INSERT INTO `order` (user_id, total, status_id, order_date) VALUES (?, ?, ?, ?)', [user_id, total, status_id, order_date]);
    const order_id = orderResult.insertId;

    // order_item 테이블에 주문 항목 데이터 삽입
    for (const item of items) {
      await pool.query('INSERT INTO order_item (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)', [order_id, item.product_id, item.quantity, item.price]);
    }

    res.status(201).json({ id: order_id, user_id, total, status_id, order_date });
  } catch (err) {
    console.error('Error placing order:', err);
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

