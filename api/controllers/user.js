import pool from "../db.js";
import bcrypt from "bcrypt";

// updateUser,

// UPDATE
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("userId : ", userId);

        const { name, phone, address } = req.body;

        const [result] = await pool.query(
            "UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?",
            [name, phone, address]
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

// updateUserMembership,
// editPassword,
// deleteUser,
// getIdUser,
// getAllUsers