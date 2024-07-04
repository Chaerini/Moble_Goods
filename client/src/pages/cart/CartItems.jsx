import React, { useState, useEffect, createContext } from 'react';

export const CartContext = createContext();

function CartItems({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // 서버로부터 장바구니 항목을 가져오는 함수
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch('/api/cart'); // GET 요청
        if (response.ok) {
          const data = await response.json();
          setCartItems(data.result);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCartItems(); // 컴포넌트가 마운트될 때 데이터를 가져옴
  }, []);

  // 장바구니에 항목을 추가하는 함수
  const addToCart = async (item) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: item.id,
          quantity: item.quantity,
          check: item.check
        })
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Cart item added:', result);
        setCartItems([...cartItems, { ...item, id: result.insertId }]);
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 장바구니 항목을 수정하는 함수
  const updateCartItem = async (id, quantity, check) => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity, check })
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Cart item updated:', result);
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity, check } : item));
      } else {
        console.error('Failed to update cart item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // 장바구니 항목을 삭제하는 함수
  const deleteCartItem = async (id) => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Cart item deleted:', result);
        setCartItems(cartItems.filter(item => item.id !== id));
      } else {
        console.error('Failed to delete cart item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, updateCartItem, deleteCartItem }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartItems;
