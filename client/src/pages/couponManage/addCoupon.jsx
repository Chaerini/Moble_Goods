import { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AdminSidebar from "../admin/adminSidebar/AdminSidebar";
import Search from "../../component/search/searchProduct";
const Coupon = () =>{
    const [coupon,setCoupon] = useState({
        name:"",
        discount:"",
        start_date:"",
        end_date:"",
        conditions:"",
    });
    const handleChange = (e) =>{
        setCoupon((prev) => ({...prev,[e.target.name]:e.target.value}));
    };
    const handleClick = async e =>{
        e.preventDefault()
        try{
            console.log("====쿠폰=====",coupon)
            await axios.post(`http://localhost:8080/api/coupons`,coupon);
            console.log("추가완료");
        }catch(err){
            console.log("error",err);
        }
}
    return(
        <div className="login">
            <div className="login-container">
            <h2>쿠폰 추가하기</h2>
            <input type="text" onChange={handleChange} placeholder="이름" name="name" className="login-input"/>
            <input type="number" onChange={handleChange} placeholder="할인" name="discount" className="login-input"/>
            <input type="date" onChange={handleChange} placeholder="시작일" name="start_date" className="login-input"/>
            <input type="date" onChange={handleChange} placeholder="만료일" name="end_date" className="login-input"/>
            <input type="number" onChange={handleChange} placeholder="조건" name="conditions" className="login-input"/>
            <button onClick={handleClick} className="btn"><Link to="/getcoupon">추가</Link></button>
            </div>
        </div>
    )
}
export default Coupon;