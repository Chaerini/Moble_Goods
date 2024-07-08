import { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "../productManage/productmanage.css";
const AddNotice = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [notice, setNotice] = useState({
    title: "",
    content: "",
    userId:""
  });
  const handleChange = (e) => {
    setNotice((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  console.log(notice);
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/notice`, notice);
      console.log("등록 완료");
      alert("공지가 추가되었습니다.")
    } catch (err) {
      console.log(err);
      alert("공지 추가에 실패했습니다.")
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <label>공지사항 추가하기</label>
        <input
          type="text"
          onChange={handleChange}
          placeholder="제목"
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
        <input
          type="text"
          onChange={handleChange}
          placeholder="작성자"
          name="userId"
          className="product-input"
        />
        <button onClick={handleClick} className="login-button" type="submit">
          <Link to="/getnotice">추가</Link>
        </button>
      </div>
    </div>
  );
};
export default AddNotice;
