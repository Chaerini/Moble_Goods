// src/components/MyqnaList.jsx
import React, { useState, useEffect } from 'react';
import Navbar from "../../component/navbar/navbar";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";
import './myqnalist.css';
import axios from 'axios';

const MyqnaList = () => {
  // QnA 데이터를 저장할 state 생성
  const [qnaList, setQnaList] = useState([]); // 초기 상태를 빈 배열로 설정
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

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
  }, []);

  // 질문 클릭 시 답변을 표시/숨기는 함수
  const toggleAnswer = (index) => {
    setQnaList(qnaList.map((item, i) => i === index ? { ...item, showAnswer: !item.showAnswer } : item));
  };

  // 날짜 형식을 0000.00.00로 변환하는 함수 추가
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <>
      <Header />
      <Navbar />
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
                      <div className="qnaList-content">{qna.contents}</div> {/* 문의 내용 출력 */}
                      <div className="qnaList-divider"></div> {/* 문의 내용과 답변 사이에 실선 추가 */}
                      <div className="qnaList-answer">
                        A. {qna.answer}
                      </div>
                    </div>
                  </div>
                )}
                <hr className="qnaList-hr" /> {/* 실선 추가 */}
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyqnaList;
