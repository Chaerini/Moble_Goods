import React from 'react';
import './ironproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function IronProduct() {
  const products = [
    { id: 1, name: '아이언맨 인형', price: '₩25,000', image: '/images/iron1.jpg' },
    { id: 2, name: '아이언맨 쿠션', price: '₩30,000', image: '/images/iron2.jpg' },
    { id: 3, name: '아이언맨 키링', price: '₩15,000', image: '/images/iron3.jpg' },
    { id: 4, name: '아이언맨 머그컵', price: '₩12,000', image: '/images/iron4.jpg' },
  ];

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="ironproduct">
        <h2>아이언맨 상품 목록</h2>
        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default IronProduct;
