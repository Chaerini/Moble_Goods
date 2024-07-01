import React from 'react';

function CartItem({ item }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <span>{item.name}</span>
      <span>{item.price}원</span>
    </div>
  );
}

export default CartItem;
