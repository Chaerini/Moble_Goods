// import React, { useState } from "react";
// import "./faq.css";

// const Customer = () => {
//   const [activeIndex, setActiveIndex] = useState(null);

//   const toggleFaq = (index) => {
//     setActiveIndex(activeIndex === index ? null : index);
//   };

//   return (
//     <div className="faq-container">
//       <header className="header">
//         <h1>FAQ</h1>
//         <div className="search-container">
//           <input type="text" placeholder="궁금한 사항을 입력해 주세요." />
//           <button type="button">
//             <span role="img" aria-label="search">
//               🔍
//             </span>
//           </button>
//         </div>
//         <nav className="nav-tabs">
//           <a href="#휴대폰/실시간계좌이체">휴대폰/실시간계좌이체</a>
//           <a href="#회원등급">회원등급</a>
//           <a href="#회원가입/정보변경">회원가입/정보변경</a>
//           <a href="#환불방법">환불방법</a>
//         </nav>
//       </header>
//       <main>
//         {faqItems.map((item, index) => (
//           <div key={index} className="faq-item">
//             <div className="faq-question" onClick={() => toggleFaq(index)}>
//               <span>Q. {item}</span>
//               <span>{activeIndex === index ? "▲" : "▼"}</span>
//             </div>
//             {activeIndex === index && (
//               <div className="faq-answer">
//                 <p>여기에 답변 내용이 들어갑니다.</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// };

// export default Customer;

import React, { useState } from 'react';
import './Faq.css'; // CSS 파일을 가져옵니다.

const Faq = () => {
  // 상태 정의: 검색어와 활성화된 질문 인덱스
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  // 카테고리 배열
  const categories = [
    '휴대폰/실시간계좌이체', '회원등급', '회원가입/정보변경', 
    '환불방법', '쿠폰/포인트', '상품문의', '배송조회', '기타'
  ];

  // FAQ 질문 배열
  const faqs = [
    '스냅스 웹사이트 이용 적정 모니터 해상도 안내',
    '주문한 제품 수정할 수 있나요?',
    '신용카드 영수증을 받고 싶어요',
    '현금영수증지출증빙을 받고 싶어요',
    '쿠폰 번호는 어떻게 등록하나요?',
    '세금계산서를 발행해주세요',
    '이니시스 결제 설치가 안돼요',
    '선입금하여 나중에 주문 시 사용할 수 있나요?',
    'ATM으로 입금하는데 원단위 금액은 어떻게 하나요?'
  ];

  // 드롭다운 토글 함수
  const toggleDropdown = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      {/* FAQ 헤더 */}
      <h1 className="faq-header">FAQ</h1>
      {/* 검색 입력란 */}
      <input
        type="text"
        className="faq-search"
        placeholder="궁금한 사항을 입력해 주세요."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        onFocus={e => e.target.placeholder = ''}
        onBlur={e => e.target.placeholder = '궁금한 사항을 입력해 주세요.'}
      />
      {/* 카테고리 목록 */}
      <div className="faq-categories">
        {categories.map(category => (
          <span key={category} className="faq-category">{category}</span>
        ))}
      </div>
      {/* FAQ 질문 목록 */}
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            {/* 질문 항목 */}
            <div className="faq-question" onClick={() => toggleDropdown(index)}>
              Q. {faq}
            </div>
            {/* 답변 항목 */}
            {activeIndex === index && (
              <div className="faq-answer">
                A. {faq}의 답변입니다.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
