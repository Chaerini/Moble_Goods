import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import mysql from 'mysql2' // npm install mysql2 
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import reviewRoutes from "./routes/reviews.js";
import reviewImageRoutes from "./routes/review_image.js"
import ordersRoutes from "./routes/orders.js"
import orderitemRoutes from "./routes/order_items.js"
import statusesRoutes from "./routes/statuses.js"
import productRoutes from './routes/products.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import commentRoutes from './routes/comments.js';
import askRoutes from './routes/asks.js';
import couponRoutes from './routes/coupons.js';
import usercouponRoutes from './routes/usercoupons.js'
import noticeRoutes from "./routes/notices.js";
import cartRoutes from "./routes/carts.js";
import searchRoutes from "./routes/searches.js";
import categoryRoutes from './routes/category.js';
import searchUserRoutes from "./routes/searchUsers.js";
import searchNoticeRoutes from "./routes/searchNotices.js";
// __filename과 __dirname을 생성
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
dotenv.config();

//서버 시작할 때 업로드 폴더 없으면 생성 
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

//middlewares
const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // 클라이언트 url 
    credentials: true, // 자격 증명 허용
}
app.use(cors(corsOptions))
// morgan 로깅 미들웨어 사용
app.use(morgan('combined'));
app.use(cookieParser())
app.use(express.json())
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});
// 정적 파일 경로 추가
app.use('/uploads', express.static('uploads'));

// MySQL 연결 풀 설정
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// MySQL 연결 풀 연결
db.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
    connection.release(); // 연결 반환
});
app.use("/api/reviews", reviewRoutes);
app.use("/api/review_image", reviewImageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/order_items', orderitemRoutes); 
app.use('/api/statuses', statusesRoutes);
app.use('/api/products', productRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/asks', askRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/usercoupons', usercouponRoutes);
app.use('/api/notice',noticeRoutes);
app.use('/api/carts', cartRoutes);
app.use("/api/search",searchRoutes);
app.use('/api/maincategory', categoryRoutes);
app.use("/api/searchuser",searchUserRoutes);
app.use("/api/searchnotice",searchNoticeRoutes);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});