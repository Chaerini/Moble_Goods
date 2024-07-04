import React, { useEffect,useState,useContext } from "react";
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
import { AuthContext } from "../../Context/AuthContext";
const UserManage = () => {
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectUserId, setSelectUserId] = useState();
  const [searchWord, setSearchWord] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
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
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        setData(data.filter(product => product.id !== id));
    } catch (err) {
        console.log(err);
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
                  <div className="orderManage-select-box">
                <label htmlFor="orderManage-orderNumber" className="orderManage-select-label">
                  상품명
                </label>
                <input type="text" onChange={(e) => setSearchWord(e.target.value)} onKeyDown={handleKeyPress} 
                       className="orderManage-orderNumber-search-input">    
                </input>
                      <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch}></FontAwesomeIcon>

                </div>
              </div>
           </div>
              <div className="admin-container">
                      <table className="notice-table">
                          {(!userData || userData.length < 0) ? (
                              alert("사용자 정보가 없습니다.")
                          ) : (     
                    <tbody>
                    <tr>
                        <th className='th'>이름</th>
                        <th className='th'>수량</th>
                        <th className='th'>가격</th>
                        <th className='th'>할인율</th>
                        <th className='th'>할인된 가격</th>
                        <th className='th'>날짜</th>
                        <th className="th">삭제/수정</th>
                    </tr>
                            {userData.map((product) => (
                                <tr key={product.id} className='tr'>
                                    <td className='td'>{product.name}</td>
                                    <td className='td'>{product.quantity}</td>
                                    <td className='td'>{product.price}</td>
                                    <td className='td'>{product.discount_rate}</td>
                                    <td className='td'>{product.discounted_price}</td>
                                    <td className='td'>{product.date}</td>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(product.id)} />
                                <FontAwesomeIcon icon={faPen} onClick={() => navigate(`/updateproduct/${product.id}`)} />
                                </tr>
                            ))}
                        </tbody>)}
                      </table>
                  </div>
              </div>
      </div >
  );
};

export default UserManage;