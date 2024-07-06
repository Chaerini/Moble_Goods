import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "../productManage/productmanage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../admin/adminHeader/AdminHeader";
import AdminSidebar from "../admin/adminSidebar/AdminSidebar";
import Search from "../../component/search/searchProduct";

const GetNotice = () => {
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/notice`);
        console.log("response.data.rows : ", response.data.rows);
        setNotice(response.data.rows);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    try {
      console.log("id", id);
      await axios.delete(`http://localhost:8080/api/notice/` + id);
      window.location.reload();
      console.log(id);
    } catch (err) {
      console.log(id);
      console.log(err);
    }
  };
  return (
    <div>
      <div className="product-container">
        <FontAwesomeIcon icon={faPlus} onClick={() => navigate("/addnotice")} />
        <h2 className="notice">공지사항</h2>
        <table className="notice-table">
          <thead>
            <tr>
              <th className="th">제목</th>
              <th className="th">내용</th>
              <th className="th">삭제/수정</th>
            </tr>
          </thead>
          <tbody>
            {notice.map((notice) => (
              <tr key={notice.id} className="tr">
                <td className="td">{notice.title}</td>
                <td className="td">{notice.content}</td>
                <td className="td">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(notice.id)}
                  />
                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => navigate(`/updatenotice/${notice.id}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default GetNotice;
