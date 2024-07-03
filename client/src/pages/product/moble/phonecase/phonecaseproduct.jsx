import React from 'react';
import './phonecaseproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function PhoneCaseProduct() {
  const products = [
    { id: 1, name: '아이폰 12케이스', price: '₩25,000', image: '/images/phonecase1.jpg' },
    { id: 2, name: '아이폰 13 케이스', price: '₩30,000', image: '/images/phonecase2.jpg' },
    { id: 3, name: '아이폰 14 케이스', price: '₩15,000', image: '/images/phonecase3.jpg' },
    { id: 4, name: '아이폰 15 케이스', price: '₩12,000', image: '/images/phonecase4.jpg' },
  ];

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="phonecaseproduct">
        <h2>폰케이스 상품 목록</h2>
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

export default PhoneCaseProduct;
