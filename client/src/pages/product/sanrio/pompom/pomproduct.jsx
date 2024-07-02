import React from 'react';
import './pomproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Header from '../../../../component/header/header';
import Footer from '../../../../component/footer/footer';

function PomProduct() {
  const products = [
    { id: 1, name: '폼폼푸린 인형', price: '₩25,000', image: '/images/pom1.jpg' },
    { id: 2, name: '폼폼푸린 쿠션', price: '₩30,000', image: '/images/pom2.jpg' },
    { id: 3, name: '폼폼푸린 키링', price: '₩15,000', image: '/images/pom3.jpg' },
    { id: 4, name: '폼폼푸린 머그컵', price: '₩12,000', image: '/images/pom4.jpg' },
  ];

  return (
    <>
    <Header/>
    <Navbar/>
    <div className="pomproduct">
      <h2>폼폼푸린 상품 목록</h2>
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

export default PomProduct;
