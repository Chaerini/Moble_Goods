import React from 'react';
import './spiderproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function SpiderProduct() {
  const products = [
    { id: 1, name: '스파이더맨 인형', price: '₩25,000', image: '/images/spider1.jpg' },
    { id: 2, name: '스파이더맨 쿠션', price: '₩30,000', image: '/images/spider2.jpg' },
    { id: 3, name: '스파이더맨 키링', price: '₩15,000', image: '/images/spider3.jpg' },
    { id: 4, name: '스파이더맨 머그컵', price: '₩12,000', image: '/images/spider4.jpg' },
  ];

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="spiderproduct">
        <h2>스파이더맨 상품 목록</h2>
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

export default SpiderProduct;
