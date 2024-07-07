import React, { useState, useRef } from 'react';
import './faq.css'; // CSS 파일을 가져옵니다.

const Faq = () => {
  // 상태 정의: 검색어와 활성화된 질문 인덱스
  const [searchTerm, setSearchTerm] = useState('');
  const [activeIndex, setActiveIndex] = useState(null);

  // 상태 정의: 현재 보이는 첫 카테고리 인덱스
  const [visibleIndex, setVisibleIndex] = useState(0);

  // FAQ 항목들을 참조하기 위한 배열 생성
  const faqRefs = useRef([]);

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
    'ATM으로 입금하는데 원단위 금액은 어떻게 하나요?',
    '사진이미지 보내드리면 편집 해주나요?',
    '장바구니에 저장한 상품은 얼마나 보관되나요?',
    '주문한 상품을 다시 주문할 수 있나요?',
    '환불은 언제 처리되나요?',
    '어느 택배를 이용하나요?',
    '직접수령 가능한가요?',
    '상품 주문 후 배송지를 변경하고 싶어요',
    '퀵으로 빨리 받고 싶어요',
    '묶음배송을 받고 싶어요',
    '사진인화 사이즈를 기준으로 알고 싶어요.',
    '주문을 취소하고 싶어요',
    '원본사진은 괜찮은데 편집화면에서 깨져 보여요',
    'CMYK로 작업해도 되나요? / 색상 모드는 어떤 걸로 설정해야 하나요?',
    '임시비밀번호를 발급받았는데 이메일이 안 와요',
    '영수증이나 기타 가격표시 없이 배송해 주세요.',
    '상품권 구매도 서류발행 가능한가요?',
    '타견적서 가능한가요?',
    '일반영수증은 어떻게 발급 받나요??',
    '발행가능한 서류는 어떻게 되나요?',
    '휴대폰 결제 건도 세금계산서나 현금영수증을 받을 수 있나요?'
  ];

  // 드롭다운을 토글하는 함수
  const toggleDropdown = (index) => {
    // 같은 항목을 클릭하면 닫히고, 다른 항목을 클릭하면 열립니다.
    setActiveIndex(activeIndex === index ? null : index);
    // 선택된 항목으로 스크롤
    if (faqRefs.current[index]) {
      faqRefs.current[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 카테고리를 오른쪽으로 이동시키는 함수
  const showNextCategories = () => {
    if (visibleIndex < categories.length - 4) {
      setVisibleIndex(visibleIndex + 4);
    }
  };

  // 카테고리를 왼쪽으로 이동시키는 함수
  const showPreviousCategories = () => {
    if (visibleIndex > 0) {
      setVisibleIndex(visibleIndex - 4);
    }
  };

 // 텍스트를 강조하는 함수
  const highlightText = (faq, searchTerm) => {
    if (!searchTerm) return faq;
    const parts = faq.split(new RegExp(`(${searchTerm})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={part.toLowerCase() === searchTerm.toLowerCase() ? { fontWeight: 'bold', backgroundColor: 'yellow' } : {}}
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  // 검색어로 필터링된 FAQ 목록
  const filteredFaqs = faqs.filter(faq => faq.includes(searchTerm));

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
      {/* 카테고리 목록 및 좌우 이동 버튼 */}
      <div className="faq-categories-wrapper">
        <div className="faq-categories">
          {categories.slice(visibleIndex, visibleIndex + 4).map((category, index) => (
            <React.Fragment key={index}>
              <span className="faq-category" onClick={() => { setActiveIndex(index); }}>
                {category}
              </span>
              {index < visibleIndex + 3 && <span className="category-separator">|</span>}
            </React.Fragment>
          ))}
        </div>
        <button className="arrow left-arrow" onClick={showPreviousCategories}>&lt;</button>
        <button className="arrow right-arrow" onClick={showNextCategories}>&gt;</button>
      </div>

      {/* FAQ 질문 목록 */}
      <div className="faq-list">
        {filteredFaqs.slice(0, 9).map((faq, index) => (
          // 각 FAQ 항목에 대한 참조 설정
          <div key={index} className="faq-item" ref={el => faqRefs.current[index] = el}>
            <div className="faq-question" onClick={() => toggleDropdown(index)}>
              Q. {highlightText(faq, searchTerm)}
              <span className="dropdown-arrow">
                {activeIndex === index ? (
                  // 선택된 항목일 경우 위쪽 화살표 아이콘
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8L5 2L9 8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  // 선택되지 않은 항목일 경우 아래쪽 화살표 아이콘
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 2L5 8L9 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
            </div>
            {/* 답변 항목 */}
            {activeIndex === index && (
              <div className="faq-answer">
                A. {highlightText(faq, searchTerm)}의 답변입니다.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Faq;
