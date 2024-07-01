import React from 'react';
import './Order.css';

function Order() {
  return (
    <div className="order-container">
      <h1>주문 결제</h1>
      <div className="order-header">
        <div className="step">01. 장바구니</div>
        <div className="step current-step">02. 주문 결제</div>
        <div className="step">03. 주문 완료</div>
      </div>
      <div className="order-content">
        <div className="order-info">
          <h2>배송 정보</h2>
          <div className="form-group">
            <label>이름</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>연락처</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>이메일</label>
            <input type="email" />
          </div>
          <div className="form-group">
            <label>주소</label>
            <input type="text" />
          </div>
        </div>
        <div className="order-summary">
          <h2>최종 결제 금액 확인</h2>
          <p>합계: 4,900원</p>
          <button>결제하기</button>
        </div>
      </div>
    </div>
  );
}

export default Order;
