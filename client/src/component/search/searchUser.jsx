import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./search.css";
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

const SearchUser = () => {
  const modalBackground = useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMpData((prev) => ({ ...prev, [name]: value }));
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [mpData, setMpData] = useState({
    userId: "",
    name: "",
    address: "",
    phone: "",
    membership_name: "",
  });
  const [userData, setUserData] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users`);
        console.log("data", response.data.rows);
        setUserData(response.data.rows);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (e) => {
    console.log("검색어", searchWord);
    e.preventDefault();
    try {
      const res = await axios.get(`${apiUrl}/searchuser?name=${searchWord}`);
      setUserData(res.data.result);
      console.log(res.data.result);
      alert("조회되었습니다.");
    } catch (err) {
      console.log(err);
      alert("일치하는 고객이 없습니다.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const handleEditClick = async (user) => {
    console.log("user:", user);
    setMpData({
      userId: user.id,
      name: user.name,
      address: user.address,
      phone: user.phone,
      membership_name: user.membership_name,
    });
    setModalOpen(true);
    console.log(mpData);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/users/` + id);
      window.location.reload();
      alert("삭제되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditAction = async (userId) => {
    setModalOpen(false);
    console.log("=======data=====", userId);
    try {
      await axios.put(`${apiUrl}/users/` + userId, mpData, { withCredentials: true });
      alert('회원 정보가 수정되었습니다.');
    } catch (err) {
      alert('회원정보 수정을 실패했습니다. 다시 시도해주세요.');
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

  return (
    <div className="search-table-container">
      <div className="search-input-wrap">
        <h2><FontAwesomeIcon icon={faUser} />고객</h2>
        <input
          type="text"
          placeholder="검색할 사용자 이름을 적어주세요"
          className="search-input"
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button type="submit" className="search-btn" onClick={handleSearch}>
          검색
        </button>
      </div>
      <div className="orderManage-table-box">
        <table className="notice-table">
          <thead className="search-table-head">
            <tr>
              <th>이름</th>
              <th>아이디</th>
              <th>주소</th>
              <th>핸드폰</th>
              <th>멤버십</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody className="orderManage-table">
            {currentItems.length === 0 ? (
              <tr className="table-content"><td colSpan="7">사용자 정보가 없습니다.</td></tr>
            ) : (
              currentItems.map((user, index) => (
                <tr className="product-content" key={index}>
                  <td className="orderManage-td">{user.name}</td>
                  <td className="orderManage-td">{user.username}</td>
                  <td className="orderManage-td">{user.address}</td>
                  <td className="orderManage-td">{user.phone}</td>
                  <td className="orderManage-td">{user.membership_name}</td>
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
              <label>고객정보 수정하기</label>
              <input type="hidden" name="id" className="product-input" value={mpData.userId} />
              <input type="text" onChange={handleChange} name="name" placeholder="이름" className="product-input" value={mpData.name} />
              <input type="text" onChange={handleChange} name="address" placeholder="주소" className="product-input" value={mpData.address} />
              <input type="text" onChange={handleChange} name="phone" placeholder="핸드폰" className="product-input" value={mpData.phone} />
              <button onClick={() => handleEditAction(mpData.userId)} className="btn">수정</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchUser;
