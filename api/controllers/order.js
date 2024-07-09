import pool from "../db.js";

// 관리자-전체 주문내역 조회
export const getAdminAllOrders = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT
          \`order\`.id AS order_id,
          users.id AS users_id,
          users.username AS username,
          \`order\`.total AS total,
          \`order\`.status_id AS status_id,
          \`order\`.order_date AS order_date,
          order_item.id AS orderitem_id,
          order_item.quantity AS quantity,
          status.delivery_status AS delivery_status, 
          status.waybill_number AS waybill_number, 
          product.id AS product_id, 
          product.name AS product_name, 
          product_image.url AS product_image_url
      FROM \`order\`
      JOIN users ON \`order\`.user_id = users.id
      JOIN order_item ON order_item.order_id = \`order\`.id
      JOIN status ON status.id = \`order\`.status_id
      LEFT JOIN product ON product.id = order_item.product_id
      LEFT JOIN product_image ON product_image.product_id = product.id
      ORDER BY \`order\`.order_date DESC;
      `
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// orderId와 연관된 orderItem 삭제
export const DeleteAdminOrder = async (req, res) => {
  const orderId = req.params.id;

  try {
    // orderId에 해당하는 모든 OrderItem 삭제
    await pool.query("DELETE FROM order_item WHERE order_id = ?", [orderId]);
    console.log("orderItem 삭제");

    // orderId에 해당하는 모든 status 삭제
    await pool.query(
      "DELETE FROM status WHERE id = ( SELECT status_id FROM `order` WHERE id = ?)",
      [orderId]
    );
    console.log("status 삭제");

    // orderId에 해당하는 Order 삭제
    const [result] = await pool.query("DELETE FROM `order` WHERE id = ?", [
      orderId,
    ]);
    console.log("order 삭제");

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order and associated items deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting the order",
      error: error.message,
    });
  }
};
// 모든 주문 조회함
export const getAllOrders = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM `order`");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문 아이디로 조회 - 특정 주문 아이디에 해당하는 주문을 조회함
export const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT o.id AS order_id, o.user_id, o.total, s.delivery_status, s.waybill_number
      FROM \`order\` o
      JOIN status s ON o.status_id = s.id
      WHERE o.id = ?
    `,
      [id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 유저 아이디로 조회 - 특정 유저 아이디에 해당하는 모든 주문을 조회함
export const getOrdersByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const [rows] = await pool.query(
      `
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
    `,
      [user_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 유저 아이디 및 날짜로 조회 - 특정 유저 아이디와 날짜에 해당하는 모든 주문을 조회함
export const getOrdersByUserIdDate = async (req, res) => {
  const { user_id } = req.params;
  const { startDate, endDate } = req.query;

  try {
    const [rows] = await pool.query(
      `
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
        LEFT JOIN product_image ON product_image.product_id = product.id
        WHERE \`order\`.user_id = ? AND (\`order\`.order_date >= ? AND DATE(\`order\`.order_date) <= ?)
        GROUP BY \`order\`.id
        ORDER BY \`order\`.order_date DESC;
    `,
      [user_id, startDate, endDate]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문에 해당하는 아이템의 개수 조회
export const getOrdersByCount = async (req, res) => {
  const { user_id, order_id } = req.params;

  try {
    const [rows] = await pool.query(
      `
      SELECT COUNT(*) AS \`COUNT\`
      FROM \`order\` JOIN order_item ON \`order\`.id = order_item.order_id
      WHERE \`order\`.user_id = ? AND \`order\`.id = ?; 
    `,
      [user_id, order_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문 상태 아이디로 조회 - 특정 주문 상태 아이디에 해당하는 모든 주문을 조회함
export const getOrdersByStatusId = async (req, res) => {
  const { status_id } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT o.id AS order_id, o.user_id, o.total, o.order_date, s.delivery_status, s.waybill_number
      FROM \`order\` o
      JOIN status s ON o.status_id = s.id
      WHERE o.status_id = ?
    `,
      [status_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 배송 상태 ID로 조회 - 특정 배송 상태 ID에 해당하는 모든 주문을 조회함
export const getOrdersByDeliveryStatusId = async (req, res) => {
  const { delivery_status_id } = req.params;
  try {
    const [rows] = await pool.query(
      `
      SELECT o.id AS order_id, o.user_id, o.total, o.order_date, s.delivery_status, s.waybill_number
      FROM \`order\` o
      JOIN status s ON o.status_id = s.id
      WHERE s.id = ?
    `,
      [delivery_status_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 구매 날짜로 조회 - 특정 날짜에 해당하는 모든 주문을 조회함
export const getOrdersByDate = async (req, res) => {
  const { date } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT * FROM `order` WHERE order_date = ?",
      [date]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문 추가하기 - 새로운 주문을 추가함
export const createOrder = async (req, res) => {
  const { user_id, total, status_id, items } = req.body;

  try {
    // order 테이블에 주문 데이터 삽입
    const [orderResult] = await pool.query(
      "INSERT INTO `order` (user_id, total, status_id, order_date) VALUES (?, ?, ?, NOW())",
      [user_id, total, status_id]
    );
    const order_id = orderResult.insertId;

    // order_item 테이블에 주문 항목 데이터 삽입
    for (const item of items) {
      await pool.query(
        "INSERT INTO order_item (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [order_id, item.product_id, item.quantity, item.price]
      );
    }

    res.status(201).json({ id: order_id, user_id, total, status_id });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: err.message });
  }
};

// 주문 업데이트 - 특정 주문 아이디에 해당하는 주문을 업데이트함
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { user_id, total, status_id, order_date } = req.body;
  try {
    await pool.query(
      "UPDATE `order` SET user_id = ?, total = ?, status_id = ?, order_date = ? WHERE id = ?",
      [user_id, total, status_id, order_date, id]
    );
    res.json({ id, user_id, total, status_id, order_date });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 주문 삭제 - 특정 주문 아이디에 해당하는 주문을 삭제함
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM `order` WHERE id = ?", [id]);
    res.json({ message: "삭제 완료 ^오^" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
