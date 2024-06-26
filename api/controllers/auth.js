import jwt from 'jsonwebtoken';
import pool from "../db.js"
import bcrypt from 'bcrypt';
import dotenv from "dotenv";

dotenv.config();

// 회원가입
export const register = async (req, res) => {
    const { username, password, name, phone } = req.body;
    console.log(`register: ${username}, ${password}, ${name}, ${phone}`);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            "INSERT INTO users (username, password, name, phone) VALUES (?, ?, ?, ?)",
            [username, hashedPassword, name, phone]
        );

        res.status(200).json({
            success: true,
            message:'User has been created',
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 로그인


// 로그아웃
