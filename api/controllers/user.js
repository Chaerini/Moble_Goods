import pool from "../db.js";
import bcrypt from "bcrypt";

// UPDATE (유저 정보 변경)
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId : ", userId);

    const { name, phone, address } = req.body;

    console.log("Received data:", { name, phone, address });

    const [result] = await pool.query(
      "UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?",
      [name, phone, address, userId]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        userId,
        name,
        phone,
        address,
        message: "User updated successfully",
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ error: error.message });
  }
};
//유저 정보 변경(관리자)
export const updateUserAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId : ", userId);

    const { name, phone, address, membership_id } = req.body;

    console.log("Received data:", { name, phone, address, membership_id });

    const [result] = await pool.query(
      "UPDATE users SET name = ?, phone = ?, address = ?,membership_id=? WHERE id = ?",
      [name, phone, address, membership_id, userId]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        userId,
        name,
        phone,
        address,
        membership_id,
        message: "User updated successfully",
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ error: error.message });
  }
};
// UPDATE (유저 멤버십 변경)
export const updateUserMembership = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId : ", userId);

    const { membership_id } = req.body;

    const [result] = await pool.query(
      "UPDATE users SET membership_id = ? WHERE id = ?",
      [membership_id, userId]
    );

    if (result.affectedRows > 0) {
      res.status(200).json({
        userId,
        membership_id,
        message: "User updated successfully",
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).json({ error: error.message });
  }
};

// UPDATE (비밀번호 변경)
export const updatePassword = async (req, res) => {
  const { userId } = req.params;
  const { password, newPassword } = req.body;
  console.log(newPassword);

  try {
    console.log(`Updating password for user: ${userId}`);

    // 유저의 비밀번호를 DB에서 가져옴
    const [users] = await pool.query(
      "SELECT password FROM users WHERE id = ?",
      [userId]
    );

    // 유저가 존재하지 않는 경우
    if (users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const user = users[0];

    // 현재 비밀번호와 같은지 확인
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 새 비밀번호를 암호화하여 저장
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [updateResult] = await pool.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, userId]
    );

    // 비밀번호 업데이트가 실패한 경우
    if (updateResult.affectedRows === 0) {
      console.error("Failed to update password");
      return res
        .status(500)
        .json({ success: false, message: "Failed to update password" });
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("Error updating password:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE (회원 탈퇴/삭제)
export const deleteUser = async (req, res) => {
  // 트랜잭션을 위한 커넥션 가져오기
  const connection = await pool.getConnection();
  try {
    const { userId } = req.params;
    console.log("userId:", userId);

    await connection.beginTransaction();

    // 유저가 작성한 리뷰 삭제
    await connection.query("DELETE FROM reviews WHERE user_id = ?", [userId]);

    // 사용자 삭제
    const [result] = await connection.query("DELETE FROM users WHERE id = ?", [
      userId,
    ]);

    if (result.affectedRows > 0) {
      // 트랜잭션 커밋
      await connection.commit();
      res.status(200).json({ message: "User has been deleted." });
    } else {
      // 트랜잭션 롤백
      await connection.rollback();
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // 트랜잭션 롤백
    await connection.rollback();
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Server error" });
  } finally {
    // 커넥션 반환
    connection.release();
  }
};

// GET userId
export const getIdUser = async (req, res) => {
  const { userId } = req.params;
  console.log("userId : ", userId);
  try {
    console.log("getUser");
    const [rows] = await pool.query(
      `SELECT
                    u.id AS id,
                    u.username AS username,
                    u.name AS name,
                    u.phone AS phone,
                    u.address AS address,
                    u.is_admin AS is_admin,
                    m.name AS membership_name
                FROM
                    users u
                INNER JOIN
                    memberships m ON u.membership_id = m.id
                WHERE 
                    u.id = ?
            `,
      [userId]
    );
    if (rows.length > 0) {
      res.status(200).json(rows[0]);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(400).json({ error: error.message });
  }
};

// GET ALL
export const getAllUsers = async (req, res) => {
  try {
    console.log("getAllUsers");
    const [rows] = await pool.query(
      `SELECT
                    u.id AS id,
                    u.username AS username,
                    u.name AS name,
                    u.phone AS phone,
                    u.address AS address,
                    u.is_admin AS is_admin,
                    m.name AS membership_name
                FROM
                    users u
                INNER JOIN
                    memberships m ON u.membership_id = m.id
            `
    );
    if (rows.length > 0) {
      res.status(200).json({ rows: rows });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    if (!res.headersSent) {
      res.status(400).json({ error: error.message });
    } else {
      verifyTokenNext(error);
    }
  }
};

// GET 오늘 생성된 유저 수
export const getTodayUsers = async (req, res) => {
  try {
    console.log("getTodayUsers");
    const [rows] = await pool.query(
      `
      SELECT
        id,
        created_at
      FROM
        users
      WHERE
        DATE(created_at) = CURRENT_DATE;
      `
    );
    if (rows.length > 0) {
      res.status(200).json({ rows: rows });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    if (!res.headersSent) {
      res.status(400).json({ error: error.message });
    } else {
      verifyTokenNext(error);
    }
  }
};
