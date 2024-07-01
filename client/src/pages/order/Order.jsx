import React, { useContext } from 'react';
import { CartContext } from '../cart/CartItems';
import './Order.css';

function Order() {
  const { cartItems } = useContext(CartContext);

  return (
    <div className="order-container">
      <h1>주문 결제</h1>
      <div className="order-header">
        <div className="step">01. 장바구니</div>
        <div className="step current-step">02. 주문 결제</div>
        <div className="step">03. 주문 완료</div>
      </div>
      <div className="order-content">
        <div className="order-items">
          <h2>주문 상품 정보</h2>
          {cartItems.map((item) => (
            <div className="order-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="order-item-details">
                <span className="order-item-name">{item.name}</span>
                <span className="order-item-option">옵션: {item.option}</span>
                <span className="order-item-quantity">수량: {item.quantity}</span>
                <span className="order-item-price">가격: {item.price}원</span>
              </div>
            </div>
          ))}
        </div>
        <div className="order-summary">
          <h2>최종 결제 금액 확인</h2>
          <p>
            합계: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}원
          </p>
          <button>결제하기</button>
        </div>
      </div>
    </div>
  );
}

export default Order;
