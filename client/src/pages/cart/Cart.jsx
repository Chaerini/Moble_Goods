import React from 'react';
import CartItem from './CartItem';

function Cart({ cartItems }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <div className="cart-container">
      <h2>장바구니</h2>
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>
      <div className="cart-total">
        <span>결제 예정 금액: </span><span>{totalPrice}원</span>
      </div>
    </div>
  );
}

export default Cart;
