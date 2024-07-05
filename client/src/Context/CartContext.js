import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/AuthContext';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (user) {
      fetchCartItems();
    }
  }, [user]);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/carts/${user.id}`, {
        headers: {
          'auth-token': user.token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cart items: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setCartItems(data.result);
    } catch (error) {
      setError(`Error fetching cart items: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (item) => {
    try {
      const response = await axios.post(`${apiUrl}/carts/${user.id}`, {
        product_id: item.id,
        quantity: item.quantity,
        checking: item.checking
      }, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 201) {
        setCartItems([...cartItems, { ...item, id: response.data.insertId }]);
      } else {
        setError(`Failed to add item to cart: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError(error.response ?
        `Error adding item to cart: ${error.response.status} ${error.response.statusText}` :
        `Error adding item to cart: ${error.message}`
      );
    }
  };

  const updateCartItem = async (id, quantity, checking) => {
    try {
      const response = await axios.put(`${apiUrl}/carts/${user.id}/${id}`, { quantity, checking }, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity, checking } : item));
      } else {
        setError(`Failed to update cart item: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError(error.response ?
        `Error updating cart item: ${error.response.status} ${error.response.statusText}` :
        `Error updating cart item: ${error.message}`
      );
    }
  };

  const deleteCartItem = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/carts/${user.id}/${id}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (response.status === 200) {
        setCartItems(cartItems.filter(item => item.id !== id));
      } else {
        setError(`Failed to delete cart item: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      setError(error.response ?
        `Error deleting cart item: ${error.response.status} ${error.response.statusText}` :
        `Error deleting cart item: ${error.message}`);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, updateCartItem, deleteCartItem, loading, error }}>
      {children}
    </CartContext.Provider>
  );
}
