import { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AdminSidebar from "../admin/adminSidebar/AdminSidebar";
const Coupon = () =>{
    const apiUrl=process.env.REACT_APP_API_URL
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
    console.log(coupon)
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post(`http://localhost:8080/api/coupons`,coupon);
            console.log("추가완료");
            console.log("쿠폰",coupon);
        }catch(err){
            console.log(err);
        }
}
    return(
        <header>
            <AdminSidebar/>
        <div className="Product">
            <div className="product">
            <label>쿠폰 추가하기</label>
            <input type="text" onChange={handleChange} placeholder="이름" name="name" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="할인" name="discount" className="product-input"/>
            <input type="date" onChange={handleChange} placeholder="시작일" name="start_date" className="product-input"/>
            <input type="date" onChange={handleChange} placeholder="만료일" name="end_date" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="조건" name="conditions" className="product-input"/>
            <button onClick={handleClick} className="btn">추가</button>
            </div>
        </div>
        </header>
    )
}
export default Coupon;