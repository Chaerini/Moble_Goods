// src/components/MyqnaList.jsx
import React, { useState, useEffect } from 'react';
import './myqnalist.css';

const MyqnaList = () => {
  // QnA 데이터를 저장할 state 생성
  const [qnaList, setQnaList] = useState([]);

  // 컴포넌트가 마운트될 때 서버에서 QnA 데이터를 가져옴
  useEffect(() => {
    // 실제 API 엔드포인트로 교체
    fetch('/api/qna')
      .then(response => response.json())
      .then(data => setQnaList(data))
      .catch(error => console.error('QnA 데이터를 가져오는 중 에러 발생:', error));
  }, []);

  // 질문 클릭 시 답변을 표시/숨기는 함수
  const toggleAnswer = (index) => {
    setQnaList(qnaList.map((item, i) => i === index ? { ...item, showAnswer: !item.showAnswer } : item));
  };

  return (
    <div className="qnaList">
      <h1>나의 문의 리스트</h1>
      <div className="qnaList">
        {qnaList.map((qna, index) => (
          <div key={index} className="qnaList-item">
            <div className="qnaList-question" onClick={() => toggleAnswer(index)}>
              {qna.question}
              <span className="qnaList-date">{qna.date}</span>
            </div>
            {qna.showAnswer && (
              <div className="qnaList-answer">
                {qna.answer}
              </div>
            )}
            <hr className="qnaList-hr"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyqnaList;
