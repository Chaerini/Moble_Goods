import React, { useContext } from 'react';
import './OrderComplete.css';
import { CartContext } from '../../Context/CartContext'; // CartContext import

function OrderComplete({ onClose, selectedItems }) {
  const { cartItems, setCartItems, deleteCartItem } = useContext(CartContext);

  const handleButtonClick = async () => {
    try {
      // 주문한 내역을 서버에서 삭제
      const deleteRequests = selectedItems.map(item => deleteCartItem(item.id));
      await Promise.all(deleteRequests);

      // 클라이언트에서 장바구니 업데이트
      const updatedCartItems = cartItems.filter(cartItem =>
        !selectedItems.some(selectedItem => selectedItem.id === cartItem.id)
      );
      setCartItems(updatedCartItems);
      onClose();
    } catch (error) {
      console.error('서버에서 주문 삭제 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <div className="order-complete-overlay">
      <div className="order-complete-modal">
        <h1>주문 완료</h1>
        <p>주문이 성공적으로 완료되었습니다.</p>
        <p>감사합니다!</p>
        <button onClick={handleButtonClick}>주문 내역</button>
      </div>
    </div>
  );
}

export default OrderComplete;
