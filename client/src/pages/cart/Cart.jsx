import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../component/navbar/navbar';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import './Cart.css';

// CartContext 생성
export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  // 서버로부터 장바구니 항목을 가져오는 함수
  const fetchCartItems = async () => {
    try {
      const response = await fetch(`${apiUrl}/cart`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems(data.result);
      } else {
        console.error('Failed to fetch cart items:', response.status, response.statusText);
        setError(`Failed to fetch cart items: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError(`Error fetching cart items: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  // 장바구니에 항목을 추가하는 함수
  const addToCart = async (item) => {
    try {
      const response = await fetch(`${apiUrl}/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          product_id: item.id,
          quantity: item.quantity,
          checking: item.checking
        })
      });
      if (response.ok) {
        const result = await response.json();
        setCartItems([...cartItems, { ...item, id: result.insertId }]);
      } else {
        console.error('Failed to add item to cart:', response.status, response.statusText);
        setError(`Failed to add item to cart: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      setError(`Error adding item to cart: ${error.message}`);
    }
  };

  // 장바구니 항목을 수정하는 함수
  const updateCartItem = async (id, quantity, checking) => {
    try {
      const response = await fetch(`${apiUrl}/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ quantity, checking })
      });
      if (response.ok) {
        const result = await response.json();
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity, checking } : item));
      } else {
        console.error('Failed to update cart item:', response.status, response.statusText);
        setError(`Failed to update cart item: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
      setError(`Error updating cart item: ${error.message}`);
    }
  };

  // 장바구니 항목을 삭제하는 함수
  const deleteCartItem = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/cart/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        const result = await response.json();
        setCartItems(cartItems.filter(item => item.id !== id));
      } else {
        console.error('Failed to delete cart item:', response.status, response.statusText);
        setError(`Failed to delete cart item: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting cart item:', error);
      setError(`Error deleting cart item: ${error.message}`);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, updateCartItem, deleteCartItem, loading, error }}>
      {children}
    </CartContext.Provider>
  );
}

export default function Cart() {
  const { cartItems, setCartItems, addToCart, updateCartItem, deleteCartItem, loading, error } = useContext(CartContext);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setCartItems(cartItems.map(item => ({ ...item, selected: !selectAll })));
  };

  const handleSelectItem = (id) => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
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
    navigate('/order');
  };

  return (
    <>
      <Navbar />
      <Header />
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
                    <input
                      type="checkbox"
                      name="webCartList-select-all"
                      value="true"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
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
                      <span className="cart-item-name">{item.name}</span>
                      <span className="cart-item-option">옵션: {item.option}</span>
                    </div>
                  </td>
                  <td className="cart-item-price">{item.price}원</td>
                  <td className="cart-item-quantity">
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                    </div>
                  </td>
                  <td className="cart-item-total">{item.price * item.quantity}원</td>
                  <td>
                    <button onClick={() => deleteCartItem(item.id)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="cart-summary">
          <div className="cart-summary-info">
            <span>결제 예정 금액({cartItems.length}): </span>
            <span><h1>{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}원</h1></span>
          </div>
          <button onClick={handleOrderClick}>선택상품 주문하기</button>
        </div>
        <div className='cart-guide'>
          <h3>이용안내</h3>
          <br />
          <p>·최종 편집일로부터 1년이 지난 상품은 장바구니에서 삭제됩니다.</p>
          <p>·총 결제금액이 5만원 이상인 경우 무료 배송 혜택을 받으실 수 있습니다.</p>
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
}
