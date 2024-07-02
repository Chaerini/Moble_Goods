import React from 'react';
import './captainproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function CaptainProduct() {
  const products = [
    { id: 1, name: '캡틴 아메리카 인형', price: '₩25,000', image: '/images/captain1.jpg' },
    { id: 2, name: '캡틴 아메리카 쿠션', price: '₩30,000', image: '/images/captain2.jpg' },
    { id: 3, name: '캡틴 아메리카 키링', price: '₩15,000', image: '/images/captain3.jpg' },
    { id: 4, name: '캡틴 아메리카 머그컵', price: '₩12,000', image: '/images/captain4.jpg' },
  ];

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="captainproduct">
        <h2>캡틴 아메리카 상품 목록</h2>
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

export default CaptainProduct;
