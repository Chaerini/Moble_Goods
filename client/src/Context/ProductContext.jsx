import React, { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext(null);

const ProductContextProvider = (props) => {

  const [product, setProduct] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const { user } = useContext(AuthContext);

  useEffect(() => {

    if (user) {
      console.log("user",user.token);
      fetch(`${apiUrl}/users`, {
        headers: {
          Accept: 'application/form-data',
          'auth-token': `${user.token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("고객 : ", data.product);
          setProduct(data.product)
        });
    }

  }, [])

  const allUser = () => {
    let totalAmount = 0;
    product.forEach(item => {
      console.log("item quantity = " + item.quantity);
      if (item.quantity > 0) {
        totalAmount += item.quantity * item.product_price;
      }
    });
    return allUser;
  };
  const contextValue = {allUser};
  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
