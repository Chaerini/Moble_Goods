import React from 'react';
import './littleproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function LittleMermaidProduct() {
  const products = [
    { id: 1, name: '인어공주 인형', price: '₩25,000', image: '/images/littlemermaid1.jpg' },
    { id: 2, name: '인어공주 쿠션', price: '₩30,000', image: '/images/littlemermaid2.jpg' },
    { id: 3, name: '인어공주 키링', price: '₩15,000', image: '/images/littlemermaid3.jpg' },
    { id: 4, name: '인어공주 머그컵', price: '₩12,000', image: '/images/littlemermaid4.jpg' },
  ];

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="littleproduct">
        <h2>인어공주 상품 목록</h2>
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

export default LittleMermaidProduct;
