import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
    const token = req.headers["auth-token"];
    console.log(`verifying token: ${token}`);
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        console.log("verify 완료 후 user 정보 : ", req.user);
    });
};

export const verifyTokenNext = (req, res, next) => {
    console.log("여기 들어옴")
    // authHeader는 authorization 헤더 또는 auth-token 헤더에서 가져옴
    const authHeader = req.headers.authorization || req.headers["auth-token"];
    let token;
    console.log("authHeader : ", authHeader)

    // const token = req.headers["auth-token"]?.split(" ")[1];
    
    // authHeader 존재여부 확인
    if (authHeader) {
        // Bearer <token> 형태의 경우와 그 외 경우 처리
        token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    }    

    console.log(`verifying token: ${token}`);

    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        console.log("verify 완료 후 user 정보 : ", req.user);
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (err) return next(err);
        // req.user.id , req.params.userId 정보가 같을때
        console.log(
            "verifyUser req.user.id , req.params.userId 정보 체크",
            req.params.userId
        );
        if (req.user.id == req.params.userId) {
            console.log(
                "verifyUser req.user.id , req.params.userId 정보가 같을때"
            );
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res)

    console.log("req.user : ", req.user);
    if (req.user.isAdmin) {
        console.log("verifyAdmin req.user.isAdmin: true");
        next();
    } else {
        return next(createError(403, "You are not authorized!"));
    }
    
};
