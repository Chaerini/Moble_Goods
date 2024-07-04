import React, { useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
const UpdateCoupon = () => {
  const [coupon,setCoupon] = useState({
    name: "",
    discount: "",
    start_date:"",
    end_date:"",
    conditions:""
    });
    const location = useLocation();
  const couponId = location.pathname.split("/")[2];
  const handleChange = (e) => {
    setCoupon((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  console.log();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/coupon/` + couponId, coupon);
    } catch (err) {
            console.log(err);
        }
  };
  return (
    <div className="Product">
      <div className="product">
      <label>쿠폰 수정하기</label>
        <input
          type="text"
          onChange={handleChange}
          placeholder="이름"
          name="name"
          className="product-input"
        />
        <input
          type="number"
          onChange={handleChange}
          placeholder="할인가격"
          name="discount"
          className="product-input"
        />
        <input
          type="date"
          onChange={handleChange}
          placeholder="시작일"
          name="start_date"
          className="product-input"
        />
        <input
          type="date"
          onChange={handleChange}
          placeholder="만료일"
          name="end_date"
          className="product-input"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="조건"
          name="conditions"
          className="product-input"
        />
        <button onClick={handleClick} className="btn">
          <Link to="/getnotice">수정</Link>
        </button>
      </div>
    </div>
  );
};
export default UpdateCoupon;