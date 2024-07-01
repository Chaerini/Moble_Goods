import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartItems';
import './Cart.css';

function Cart() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleOrderClick = () => {
    navigate('/order');
  };

  return (
    <div className="cart-container">
      <h1>장바구니</h1>
      <div className="cart-header">
        <div className="step current-step">01. 장바구니</div>
        <div className="step">02. 주문 결제</div>
        <div className="step">03. 주문 완료</div>
      </div>
      <div className="cart-controls">
        <button>전체 선택</button>
        <button>선택 해제</button>
        <button>삭제</button>
      </div>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-item-checkbox">
              <input type="checkbox" />
            </div>
            <div className="cart-item-info">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-option">옵션: {item.option}</span>
              </div>
            </div>
            <div className="cart-item-quantity">
              <span className="cart-item-price">{item.price}원</span>
              <div className="quantity-controls">
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
              <span className="cart-item-total">{item.price * item.quantity}원</span>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <span>결제 예정 금액({cartItems.length}): </span>
        <span>
          {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}원
        </span>
        <button onClick={handleOrderClick}>선택상품 주문하기</button>
      </div>
    </div>
  );
}

export default Cart;
