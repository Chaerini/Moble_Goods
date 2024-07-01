import React, { useState } from 'react';

export const CartContext = React.createContext();

function CartItems({ children }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '데코용 핀셋',
      option: '핑크',
      price: 1900,
      quantity: 1,
      image: 'path_to_image.png'
    }
  ]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartItems;
