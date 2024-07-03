import React from 'react';
import './spiritproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function SpiritProduct() {
  const products = [
    { id: 1, name: '센과 치히로의 행방불명 인형', price: '₩25,000', image: '/images/spirit1.jpg' },
    { id: 2, name: '센과 치히로의 행방불명 쿠션', price: '₩30,000', image: '/images/spirit2.jpg' },
    { id: 3, name: '센과 치히로의 행방불명 키링', price: '₩15,000', image: '/images/spirit3.jpg' },
    { id: 4, name: '센과 치히로의 행방불명 머그컵', price: '₩12,000', image: '/images/spirit4.jpg' },
  ];

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="spiritproduct">
        <h2>센과 치히로의 행방불명 상품 목록</h2>
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

export default SpiritProduct;
