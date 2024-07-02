import React from 'react';
import './standproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function StandProduct() {
  const products = [
    { id: 1, name: '모바일 거치대', price: '₩25,000', image: '/images/stand1.jpg' },
    { id: 2, name: '태블릿 거치대', price: '₩30,000', image: '/images/stand2.jpg' },
    { id: 3, name: '데스크 거치대', price: '₩15,000', image: '/images/stand3.jpg' },
    { id: 4, name: '차량용 거치대', price: '₩12,000', image: '/images/stand4.jpg' },
  ];

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="standproduct">
        <h2>거치대 상품 목록</h2>
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

export default StandProduct;
