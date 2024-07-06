import { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../productManage/productmanage.css";
const Product = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [notice, setNotice] = useState({
    title: "",
    content: "",
  });
  const handleChange = (e) => {
    setNotice((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(notice);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/api/notice`, notice);
      console.log("등록 완료");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Product">
      <div className="product">
        <label>공지사항 추가하기</label>
        <input
          type="text"
          onChange={handleChange}
          placeholder="이름"
          name="title"
          className="product-input"
        />
        <input
          type="text"
          onChange={handleChange}
          placeholder="내용"
          name="content"
          className="product-input"
        />
        <button onClick={handleClick} className="btn">
          <Link to="/getnotice">추가</Link>
        </button>
      </div>
    </div>
  );
};

export default Product;
