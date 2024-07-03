import React from 'react';
import './insideoutproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function InsideOutProduct() {
  const products = [
    { id: 1, name: '인사이드아웃 인형', price: '₩25,000', image: '/images/insideout1.jpg' },
    { id: 2, name: '인사이드아웃 쿠션', price: '₩30,000', image: '/images/insideout2.jpg' },
    { id: 3, name: '인사이드아웃 키링', price: '₩15,000', image: '/images/insideout3.jpg' },
    { id: 4, name: '인사이드아웃 머그컵', price: '₩12,000', image: '/images/insideout4.jpg' },
  ];

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="insideoutproduct">
        <h2>인사이드아웃 상품 목록</h2>
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

export default InsideOutProduct;
