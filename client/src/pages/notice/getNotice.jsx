import React, { useEffect, useState, useContext,useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "../productManage/productmanage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPlus,faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import SearchNotice from "../../component/search/searchNotice";
import "./Notice.css";
const GetNotice = () => {
  const navigate = useNavigate();
  const [notice, setNotice] = useState([]);
  const { user } = useContext(AuthContext);
  const [mpData,setMpData] = useState({
    title:"",
    content:""
});
const [modalOpen, setModalOpen] = useState(false);
const modalBackground = useRef();
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
  const handleDelete = async (id,e) => {
    try {
      await axios.delete(`http://localhost:8080/api/notice/` + id);
      console.log(id);
      alert("삭제되었습니다.")
    } catch (err) {
      console.log(id);
      console.log(err);
    }
  };
  const handleEditClick = async(user) =>{

    console.log("user:",user);
    setMpData({
        userId:user.id,
        title:user.title,
        content:user.content
      });
    setModalOpen(true);
    console.log(mpData)
}
const handleChange = (e) =>{
  const{name,value}=e.target;
  setMpData((prev) => ({...prev,[name]:value}));
};
const handleEditAction = async (userId) =>{
  setModalOpen(false);
  console.log("=======data=====",userId)
  try {
      const res=await axios.put(`http://localhost:8080/api/notice/`+userId,mpData, { withCredentials: true });
      alert('공지가 수정되었습니다.');
  } catch (err) {
      alert('공지 수정을 실패했습니다. 다시 시도해주세요.')
      console.log(err);
  }
}
const handleSearch = async (e) => {
  // e.preventDefault();
  try {
      alert("조회되었습니다.")
  } catch (err) {
      console.log(err);
      alert("일치하는 상품이 없습니다.")
  }
}
const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
      handleSearch(e);
  }
}
return (
  <div>
          <SearchNotice/>
        {/* <table className="notice-table">
          <thead className="search-table-head">
          <tr>
            <th>제목</th>
            <th>내용</th>
            <th>수정</th>
            <th>삭제</th>
          </tr>
          </thead>
          <tbody>
            {notice.map((notice) => (
              <tr key={notice.id}>
                <td>{notice.title}</td>
                <td>{notice.content}</td>
                <td>
                <FontAwesomeIcon icon={faPen} onClick={() => handleEditClick(notice)}/>
                  </td>
                  <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => handleDelete(notice.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {
          modalOpen &&
    <div className={'modal-container'} ref={modalBackground} onClick={e => {
        if(e.target===modalBackground.currnet){
            setModalOpen(false);
        }
    }}>
        <div className={'modal-content'}>
            <div className="Product">
                <div className="product">
                <label>공지 수정하기</label>
                <input type="hidden"  name="id"  className="product-input" value={mpData.userId}/>
                <input type="text" onChange={handleChange} name="title" placeholder="제목" className="product-input" value={mpData.title}/>
                <input type="text" onChange={handleChange} name="content" placeholder="내용" className="product-input" value={mpData.content}/>
                <button onClick={()=>handleEditAction(mpData.userId)} className="btn">수정</button>
                </div>
            </div>
        </div>
    </div> */}
        {/* } */}
      </div>
  );
};
export default GetNotice;
