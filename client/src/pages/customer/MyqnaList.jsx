// src/components/MyqnaList.jsx
import React, { useState, useEffect } from 'react';
import './myqnalist.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const MyqnaList = () => {
  // QnA 데이터를 저장할 state 생성
  const [qnaList, setQnaList] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  // 컴포넌트가 마운트될 때 서버에서 QnA 데이터를 가져옴
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/asks`);
            setQnaList(response.data.result);
        } catch (error) {
            console.error('데이터 가져오기 오류', error);
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
      <h1>나의 문의 리스트</h1>
        {qnaList.map((qna, index) => (
          <div key={index} className="qnaList-item">
            <div className="qnaList-question" onClick={() => toggleAnswer(index)}>
            <table className="notice-table">
                            <thead>
                            <tr>
                            <th>작성자</th>
                            <th >제목</th>
                            <th >내용</th>
                            <th>작성날짜</th>
                            </tr>
                            </thead>
                            <tbody className="orderManage-table">
                            {(!qnaList ||qnaList.length < 0) ? (
                                <tr className="table-content">사용자 정보가 없습니다.</tr>
                            ) : (
                                qnaList.map((user, index) => (
                                    <tr className="product-content" key={index}>
                                        <td className='orderManage-td'>{user.name}</td>
                                        <td className="orderMange-td">{user.title}</td>
                                        <td className="orderMange-td">{user.contents}</td>
                                        <td className="orderManage-td">{qna.date}</td>
                                    </tr>
                            )))}
            </tbody>
        </table>           
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
  );
};

export default MyqnaList;
