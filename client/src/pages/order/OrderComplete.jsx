import React from 'react';
import './OrderComplete.css';

function OrderComplete({ onClose }) {
  return (
    <div className="order-complete-overlay">
      <div className="order-complete-modal">
        <h1>주문 완료</h1>
        <p>주문이 성공적으로 완료되었습니다.</p>
        <p>감사합니다!</p>
        <button onClick={onClose}>주문 내역</button>
      </div>
    </div>
  );
};


export default OrderComplete;
