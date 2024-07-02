import { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
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
            await axios.post(`${apiUrl}/coupons`,coupon);
        }catch(err){
            console.log(err);
        }

}
    return(
        <div className="addCoupon">
            <h1>쿠폰 추가하기</h1>
            <input type="text" onChange={handleChange} placeholder="이름" name="name"/>
            <input type="number" onChange={handleChange} placeholder="할인" name="discount"/>
            <input type="date" onChange={handleChange} placeholder="시작일" name="start_date"/>
            <input type="date" onChange={handleChange} placeholder="만료일" name="end_date"/>
            <input type="number" onChange={handleChange} placeholder="조건" name="conditions"/>
            <button onClick={handleClick}>추가</button>
        </div>
    )
}
export default Coupon;