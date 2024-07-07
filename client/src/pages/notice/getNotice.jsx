import React, { useEffect, useState, useContext,useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "../productManage/productmanage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Search from "../../component/search/searchProduct";

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
  return (
    <div>
      <div>
      <div className="search-input-wrap">
        <h2>공지사항</h2>
        <FontAwesomeIcon icon={faPlus} onClick={() => navigate("/addnotice")} />
          </div>
        <table className="orderManage-table">
          <thead className="search-table-head">
            <tr>
            <th className="orderManage-th">제목</th>
            <th className="orderManage-th">내용</th>
            <th className="orderManage-th">수정</th>
            <th className="orderManage-th">삭제</th>
            </tr>
          </thead>
          <tbody>
            {notice.map((notice) => (
              <tr key={notice.id} className="product-content">
                <td className="orderMange-td">{notice.title}</td>
                <td className="orderMange-td">{notice.content}</td>
                <td className="orderMange-td">
                <FontAwesomeIcon icon={faPen} onClick={() => handleEditClick(notice)}/>
                  </td>
                  <td className="orderMange-td">
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
    </div>
        }
      </div>
    </div>
  );
};
export default GetNotice;
