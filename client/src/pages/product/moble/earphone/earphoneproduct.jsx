import React from 'react';
import './earphoneproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function EarphoneProduct() {
  const products = [
    { id: 1, name: '무선 이어폰', price: '₩25,000', image: '/images/earphone1.jpg' },
    { id: 2, name: '유선 이어폰', price: '₩30,000', image: '/images/earphone2.jpg' },
    { id: 3, name: '닥터드레 콜라보 이어폰', price: '₩15,000', image: '/images/earphone3.jpg' },
    { id: 4, name: '애플 콜라보 이어폰', price: '₩12,000', image: '/images/earphone4.jpg' },
  ];

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="earphoneproduct">
        <h2>이어폰 상품 목록</h2>
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

export default EarphoneProduct;
