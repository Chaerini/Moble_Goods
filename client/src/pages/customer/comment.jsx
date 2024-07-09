import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../pages/admin/orderManage/orderManage.css";
import {
  faPlus,
  faPen,
  faTrash,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const Comment = () => {
  const modalBackground = useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMpData((prev) => ({ ...prev, [name]: value }));
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [mpData, setMpData] = useState({
          admin_id:"",
          ask_id:"",
          contents:""
  });
  const [comment,setComment] = useState({
    admin_id:"",
    ask_id:"",
    contents:""
});
  const [userData, setUserData] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modalIsOpen,setModalIsOpen]=useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comments`);
        console.log("data", response.data.rows);
        setUserData(response.data.rows);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);
  const handleEditClick = async (user) => {
    console.log("user:", user);
    setMpData({
        
    admin_id: user.admin_id,
    ask_id: user.ask_id,
    contents: user.contents,
    });
    setModalOpen(true);
    console.log(mpData);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/comments/` + id);
      window.location.reload();
      alert("삭제되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditAction = async (ask_id) => {
    setModalOpen(false);
    console.log("=======data=====", ask_id);
    try {
      await axios.put(`${apiUrl}/comments` + ask_id, mpData, { withCredentials: true });
      alert('답변이 수정되었습니다.');
    } catch (err) {
      alert('답변 수정을 실패했습니다. 다시 시도해주세요.');
      console.log(err);
    }
  };

  const handleClick = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handleClick(i)}
          className={`orderManage-page-num ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(userData.length / itemsPerPage);
  const handleAddChange = (e) =>{
    setComment((prev) => ({...prev,[e.target.name]:e.target.value}));
};
const handleAddClick = async e =>{
    try{
        await axios.post(`${apiUrl}/comments`);
        alert("답변이 추가되었습니다.")
        setModalIsOpen(false);
    }catch(err){
        console.log(err);
        alert("답변 추가에 실패했습니다.")
    }
}
const handleAddAction = () =>{
    setModalIsOpen(true);

};
  return (
    <div className="search-table-container">
      <div className="search-input-wrap">
        <h2><FontAwesomeIcon icon={faUser} />문의</h2>
        <button onClick={() =>handleAddAction()} className="add-btn">추가</button>
      </div>
      <div className="orderManage-table-box">
        <table className="Admin-notice-table">
          <thead className="search-table-head">
            <tr>
              <th>관리자</th>
              <th>질문</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody className="orderManage-table">
            {currentItems.length === 0 ? (
              <tr className="table-content"><td colSpan="7">사용자 정보가 없습니다.</td></tr>
            ) : ( 
              currentItems.map((user, index) => (
                <tr className="product-content" key={index}>
                  <td className="orderManage-td">{user.admin_id}</td>
                  <td className="orderManage-td">{user.ask_id}</td>
                  <td className="orderManage-td">{user.contents}</td>
                  <td className="orderManage-td">
                    <FontAwesomeIcon icon={faPen} onClick={() => handleEditClick(user)} />
                  </td>
                  <td className="orderMange-td">
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="orderManage-page-btn-box">
        <button
          className="orderManage-page-btn"
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        {renderPageNumbers()}
        <button
          className="orderManage-page-btn"
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
      {modalOpen && (
        <div className="modal-container" ref={modalBackground} onClick={e => {
          if (e.target === modalBackground.current) {
            setModalOpen(false);
          }
        }}>
          <div className='login'>
            <div className="search-container">
              <label>공지 수정하기</label>
              <input type="hidden" name="id" className="product-input" value={mpData.userId} />
              <input type="text" onChange={handleChange} name="admin_id" placeholder="관리자" className="product-input" value={mpData.admin_id} />
              <input type="text" onChange={handleChange} name="ask_id" placeholder="질문" className="product-input" value={mpData.ask_id} />
              <input type="text" onChange={handleChange} name="contents" placeholder="내용" className="product-input" value={mpData.contents} />
              <button onClick={() => handleEditAction(mpData.userId)} className="btn">수정</button>
            </div>
          </div>
        </div>
      )}
      {modalIsOpen &&
              <div className='modal-container' ref={modalBackground} onClick={e => {
                  if (e.target === modalBackground.currnet) {
                      setModalOpen(false);
                  }
              }}>
                  <div className="login">
                      <div className="search-container">
                          <label>답변 추가하기</label>
                          <input type="hidden" name="id" className="product-input" value={mpData.userId} />
                          <input type="text" onChange={handleAddChange} name="admin_id" className="product-input" placeholder="관리자" />
                          <input type="text" onChange={handleAddChange} name="ask_id" className="product-input"placeholder="질문" />
                          <input type="text" onChange={handleAddChange} name="contents" placeholder="내용" className="product-input" />
                          <button onClick={handleAddClick} className="btn">추가</button>
                      </div>
                  </div>
              </div>
          }
    </div>
  );
};
export default Comment;
