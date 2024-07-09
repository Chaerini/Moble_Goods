// src/components/MyqnaList.jsx
import React, { useState, useEffect } from 'react';
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
        console.log('응답 데이터:', response.data); // 응답 데이터 확인
        const data = Array.isArray(response.data) ? response.data : []; // 배열 형태로 데이터 설정
        setQnaList(data);
      } catch (error) {
        console.error('QnA 데이터를 가져오는 중 에러 발생:', error);
        setQnaList([]); // 에러 발생 시 빈 배열로 설정
      }finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchData();
  }, []);

  // 질문 클릭 시 답변을 표시/숨기는 함수
  const toggleAnswer = (index) => {
    setQnaList(qnaList.map((item, i) => i === index ? { ...item, showAnswer: !item.showAnswer } : item));
  };

  return (
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
                Q. {qna.question} {/* "Q. " 고정 출력 */}
                <span className="qnaList-date">{qna.date}</span>
              </div>
              {qna.showAnswer && (
                <div className="qnaList-content-answer">
                  <div className="qnaList-content-box">
                  <div className="qnaList-content">{qna.content}</div> {/* 문의 내용 출력 */}
                    <div className="qnaList-answer">
                      A. {qna.answer}
                    </div>
                  </div>
                </div>
              )}
              <hr className="qnaList-hr"/> {/* 실선 추가 */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyqnaList;