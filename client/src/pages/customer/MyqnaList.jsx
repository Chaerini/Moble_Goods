import React, { useState, useEffect, useRef, useContext } from 'react';
import './myqnalist.css';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../../Context/AuthContext";
import "../../pages/admin/orderManage/orderManage.css";
import {
  faPlus,
  faPen,
  faTrash,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import AddComment from './AddComment.jsx';
import MyOrderDetail from '../../component/myorder/MyOrderDetail.jsx';
import Header from '../../component/header/header.jsx';
import Navbar from '../../component/navbar/navbar.jsx';
import Footer from '../../component/footer/footer.jsx';

const MyqnaList = () => {
  // QnA 데이터를 저장할 state 생성
  const [qnaList, setQnaList] = useState([]); // 초기 상태를 빈 배열로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const modalBackground = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [askId, setAskId] = useState();
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const { user } = useContext(AuthContext);
  const [mpData, setMpData] = useState({
    admin_id: user.id,
    ask_id: "",
    contents: ""
  });
  const [comment, setComment] = useState({
    admin_id: "",
    ask_id: "",
    contents: ""
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleAddChange = (e) => {
    setComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleEditClick = async (user) => {
    console.log("user:", user);
  }
  const handleAddClick = async e => {
    try {
      await axios.post(`${apiUrl}/comments`);
      alert("답변이 추가되었습니다.")
      setModalIsOpen(false);
    } catch (err) {
      console.log(err);
      alert("답변 추가에 실패했습니다.")
    }
  }
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/comments/` + id);
      window.location.reload();
      alert("삭제되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };
  // 컴포넌트가 마운트될 때 서버에서 QnA 데이터를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/asks`);
        console.log('응답 데이터:', response.data.result); // 응답 데이터 확인
        // const data = Array.isArray(response.data.result) ? response.data.result : []; // 배열 형태로 데이터 설정
        setQnaList(response.data.result);
      } catch (error) {
        console.error('QnA 데이터를 가져오는 중 에러 발생:', error);
        setQnaList([]); // 에러 발생 시 빈 배열로 설정
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchData();
  }, [openModal]);

  // 질문 클릭 시 답변을 표시/숨기는 함수
  const toggleAnswer = (index) => {
    setQnaList(qnaList.map((item, i) => i === index ? { ...item, showAnswer: !item.showAnswer } : item));
  };
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem);

  // 날짜 형식을 0000.00.00로 변환하는 함수 추가
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };
  const handleAddAction = () => {
    setModalIsOpen(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMpData((prev) => ({ ...prev, [name]: value }));
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

  const AddClick = (askid) => {
    try {
      setAskId(askid);
      setOpenModal(true);
      console.log("open", openModal);
      console.log("id:", askid);
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <>
      {openModal && <AddComment setOpen={setOpenModal} askid={askId} />}
      <Header />
      <Navbar />
      <div>
        <div className="qnaList">
          <h1 className="qnaList-header">나의 문의 리스트</h1>
          <div className="qnaList-body">
            {loading ? (
              <p>로딩 중...</p>
            ) : qnaList.length === 0 ? (
              <p>문의 내역이 없습니다.</p>
            ) : (
              qnaList.map((qna, index) => (
                <div key={index} className="qnaList-item">
                  <div className="qnaList-question" onClick={() => toggleAnswer(index)}>
                    Q. {qna.title} {/* "Q. " 고정 출력 */}
                    <div className="qnaList-date">{formatDate(qna.date)}</div>
                  </div>
                  {qna.showAnswer && (
                    <div className="qnaList-content-answer">
                      <div className="qnaList-content-box">
                        <div className="qnaList-content">
                        </div> {qna.contents}
                        <div className="qnaList-divider">
                          {mpData.contents}</div> {/* 문의 내용과 답변 사이에 실선 추가 */}
                        {!qna.comment ? (
                          <div className='qnaList-answer'>
                            <button onClick={() => AddClick(qna.id)}>답변 등록</button>
                          </div>
                        ) : (
                          <div className="qnaList-answer">
                            A. {qna.comment}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <hr className="qnaList-hr" /> {/* 실선 추가 */}
                </div>
              ))
            )}

          </div>

        </div>

      </div >
      <Footer />
    </>
  );
};

export default MyqnaList;