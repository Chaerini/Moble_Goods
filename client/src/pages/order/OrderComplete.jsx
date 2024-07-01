// src/pages/order/OrderComplete.js
import React from 'react';
import './OrderComplete.css';

function OrderComplete() {
  return (
    <div className="order-complete-container">
      <h1>주문 완료</h1>
      <p>주문이 성공적으로 완료되었습니다. 감사합니다!</p>
      <p>주문 내역은 이메일로 발송되었습니다.</p>
      <button onClick={() => window.location.href = '/'}>홈으로 이동</button>
    </div>
  );
}

export default OrderComplete;
