import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./search.css";
import {
  faPen,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

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

  const handleSearch = async (e) => {
    console.log("검색어", searchWord);
    e.preventDefault();
    try {
      const res = await axios.get(`${apiUrl}/searchuser?name=${searchWord}`);
      setUserData(res.data.result);
      console.log(res.data.result);
    } catch (err) {
      console.log(err);
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

  return (
    <div className="admin">
      <div className="admin-center">
        <div className="admin-search-bg">
          <div className="search-input-wrap">
            <input
              type="text"
              placeholder="검색할 사용자 이름을 적어주세요"
              className="search-input"
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch} />
          </div>
        </div>

        {userData.length > 0 && (
          <div className="product-container">
            <table className="notice-table">
              <thead>
                <tr>
                  <th className='th'>이름</th>
                  <th className='th'>아이디</th>
                  <th className='th'>주소</th>
                  <th className='th'>핸드폰</th>
                  <th className='th'>멤버십</th>
                  <th className="th">삭제/수정</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user, index) => (
                  <tr className="product-content" key={index}>
                    <td className="td">{user.name}</td>
                    <td className="td">{user.username}</td>
                    <td className="td">{user.address}</td>
                    <td className="td">{user.phone}</td>
                    <td className="td">{user.membership_name}</td>
                    <td className="td">
                      <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} />
                      <FontAwesomeIcon icon={faPen} onClick={() => handleEditClick(user)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modalOpen && (
        <div className={'modal-container'} ref={modalBackground} onClick={e => {
          if (e.target === modalBackground.current) {
            setModalOpen(false);
          }
        }}>
          <div className={'modal-content'}>
            <div className="Product">
              <div className="product">
                <label>고객정보 수정하기</label>
                <input type="hidden" name="id" className="product-input" value={mpData.userId} />
                <input type="text" onChange={handleChange} name="name" placeholder="이름" className="product-input" value={mpData.name} />
                <input type="text" onChange={handleChange} name="address" placeholder="주소" className="product-input" value={mpData.address} />
                <input type="text" onChange={handleChange} name="phone" placeholder="핸드폰" className="product-input" value={mpData.phone} />
                <button onClick={() => handleEditAction(mpData.userId)} className="btn">수정</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
