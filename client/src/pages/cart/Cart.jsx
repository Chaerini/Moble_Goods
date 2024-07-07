import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/navbar/navbar';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import './Cart.css';
import { CartContext } from '../../Context/CartContext'; // CartContext 파일 위치를 기준으로 import

export default function Cart() {
  const { cartItems, setCartItems, updateCartItem, deleteCartItem, loading, error } = useContext(CartContext);
  const [allChecked, setAllChecked] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('cartItems:', cartItems); // cartItems를 로그로 출력하여 확인
  }, [cartItems]);

  // 전체 선택 상태 업데이트
  useEffect(() => {
    const allSelected = cartItems.every(item => item.selected);
    setAllChecked(allSelected);
  }, [cartItems]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCartItems(cartItems.map(item => ({ ...item, selected: !selectAll })));
  };

  const handleSelectItem = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  // 전체 선택 체크박스 핸들러
  const handleAllCheckedChange = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    setCartItems(cartItems.map(item => ({ ...item, selected: checked })));
  };

  const handleQuantityChange = (id, amount) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      updateCartItem(id, item.quantity + amount, item.checking);
    }
  };

  const handleOrderClick = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    if (selectedItems.length === 0) {
      alert('주문할 상품을 선택해주세요.');
      return;
    }
    navigate('/order', { state: { selectedItems } });
  };

  const formatNumber = (num) => {
    return num.toLocaleString('ko-KR');
  };

  const selectedTotalAmount = cartItems
    .filter(item => item.selected)
    .reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <>
      <Header />
      <Navbar />
      <div className="cart-container">
        <h1>장바구니</h1>
        <div className="cart-header">
          <div className="step current-step">01. 장바구니</div>
          <div className="step">02. 주문 결제</div>
          <div className="step">03. 주문 완료</div>
        </div>
        <div className="cart-controls">
          <button onClick={handleSelectAll}>전체 선택</button>
          <button onClick={() => setCartItems(cartItems.map(item => ({ ...item, selected: false })))}>선택 해제</button>
          <button onClick={() => setCartItems(cartItems.filter(item => !item.selected))}>삭제</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <table className="cart-items">
            <thead>
              <tr className='cart-items-menu'>
                <th>
                  <div className="checkbox">
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        checked={allChecked}
                        onChange={handleAllCheckedChange}
                      />
                    </div>
                    <label htmlFor="webCartList-select-all" style={{ zIndex: 4 }}></label>
                  </div>
                </th>
                <th>주문 상품 정보</th>
                <th>상품 금액</th>
                <th>수량</th>
                <th>주문금액</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr className="cart-item" key={item.id}>
                  <td className="cart-item-checkbox">
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        checked={item.selected || false}
                        onChange={() => handleSelectItem(item.id)}
                      />
                      <label htmlFor={`cart-item-${item.id}`} style={{ zIndex: 4 }}></label>
                    </div>
                  </td>
                  <td className="cart-item-info">
                    <img src={item.url} alt={item.name} />
                    <div className="cart-item-details">
                      <span className="cart-item-name">상품: {item.name}</span>
                    </div>
                  </td>
                  <td className="cart-item-price">{formatNumber(item.price)}원</td>
                  <td className="cart-item-quantity">
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                  </td>
                  <td className="cart-item-total">{formatNumber(item.price * item.quantity)}원</td>
                  <td>
                    <button className="quantity-controls-del" onClick={() => deleteCartItem(item.id)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="cart-summary">
          <div className="cart-summary-info">
            <span>결제 예정 금액({cartItems.filter(item => item.selected).length}): </span>
            <span><h1>{formatNumber(selectedTotalAmount)}원</h1></span>
          </div>
          <button onClick={handleOrderClick}>선택상품 주문하기</button>
        </div>
        <div className='cart-guide'>
          <h3>이용안내</h3>
          <br />
          <p>·최종 편집일로부터 1년이 지난 상품은 장바구니에서 삭제됩니다.</p>
          ·총 결제금액이 10만원 이상인 경우 무료 배송 혜택을 받으실 수 있습니다.
          <br />
          <br />
          <br />
        </div>
      </div >
      <Footer />
    </>
  );
}
