import React from 'react';
import './chargerproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function ChargerProduct() {
  const products = [
    { id: 1, name: '고속 충전기', price: '₩25,000', image: '/images/charger1.jpg' },
    { id: 2, name: '무선 충전기', price: '₩30,000', image: '/images/charger2.jpg' },
    { id: 3, name: '차량용 충전기', price: '₩15,000', image: '/images/charger3.jpg' },
    { id: 4, name: '보조 배터리', price: '₩12,000', image: '/images/charger4.jpg' },
  ];

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="chargerproduct">
        <h2>충전기 상품 목록</h2>
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

export default ChargerProduct;
