import React, { useEffect,useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import {
  faHouse,
  faBook,
  faUser,
  faX,
  faPen,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserManage = () => {
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectUserId, setSelectUserId] = useState();
  const [searchWord, setSearchWord] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // 사용자 정보가 업데이트 됐을 경우 렌더링
 // 검색 버튼 클릭 했을 때
  const handleSearch = async (e) => {
    console.log("검색어",searchWord)
      e.preventDefault();
      try {
          const res = await axios.get(`http://localhost:8080/api/search/name?name=${searchWord}`);
          setUserData(res.data.result);
          console.log(res.data.result);
      } catch (err) {
          console.log(err);
      }
  }

  const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
          handleSearch(e);
      }
  }
  return (
      <div className="admin">
          <div className="admin-left">
              <img className="admin-menu-logo"></img>
          </div>

          <div className="admin-center">
              <div className="admin-search-bg">
                  <div className="admin-search-input">
                      <input type="text" placeholder="검색할 사용자 이름을 적어주세요" onChange={(e) => setSearchWord(e.target.value)} onKeyDown={handleKeyPress}></input>
                      <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch}/>
                  </div>
              </div>

              <div className="admin-container">
                  <div className="admin-info-bg">

                      <table className="admin-table">
                          <colgroup>
                              <col style={{ width: '20%' }} />
                              <col style={{ width: '20%' }} />
                              <col style={{ width: '30%' }} />
                              <col style={{ width: '10%' }} />
                              <col style={{ width: '5%' }} />
                              <col style={{ width: '5%' }} />
                          </colgroup>
                          <tr className="table-title">
                              <th className="th">아이디</th>
                              <th className="th">이름</th>
                              <th className="th">전화번호</th>
                              <th className="th">주소</th>
                          </tr>
                          {(!userData || userData.length < 0) ? (
                              <tr className="table-content"><td colSpan="6">사용자 정보가 없습니다.</td></tr>
                          ) : (
                              userData.map((user, index) => (
                                  <tr className="table-content" key={index}>
                                    
                                      <td className="content-title">{user.username}</td>
                                      <td>{user.name}</td>
                                      <td>{user.phone}</td>
                                      <td>{user.address}</td>
                                  </tr>
                              )))}

                      </table>


                  </div>
              </div>

          </div>
      </div >
  );
};

export default UserManage;