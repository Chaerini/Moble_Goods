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
export const login = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT id, username, password, is_admin FROM users WHERE username = ?",
            [req.body.username]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = rows[0];
        console.log(user);
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        console.log(isMatch);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, isAdmin: user.is_admin },
            process.env.JWT_SECRET,
            // {
            //     expiresIn: "1h",
            // }
        );

        // user 객체에서 password와 is_admin을 제외한 나머지 속성만 포함
        const { password, is_admin, ...otherDetails } = user;
        res.cookie("access_token", token, {
            httpOnly: true,
            sameSite: 'strict',
            path: '/'
        })
            .status(200)
            .json({
                details: { ...otherDetails, token },
                is_admin,
            });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// 로그아웃
export const logout = (req, res) => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: '/',
        sameSite: 'strict',
    })  
        .status(200)
        .json({message: "Logged out successfully"});
};
