import React from 'react';
import './kuroproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Header from '../../../../component/header/header';
import Footer from '../../../../component/footer/footer';

function KuroProduct() {
  const products = [
    { id: 1, name: '쿠로미 인형', price: '₩25,000', image: '/images/kuro1.jpg' },
    { id: 2, name: '쿠로미 쿠션', price: '₩30,000', image: '/images/kuro2.jpg' },
    { id: 3, name: '쿠로미 키링', price: '₩15,000', image: '/images/kuro3.jpg' },
    { id: 4, name: '쿠로미 머그컵', price: '₩12,000', image: '/images/kuro4.jpg' },
  ];

  return (
    <>
    <Header/>
    <Navbar/>
    <div className="kuroproduct">
      <h2>쿠로미 상품 목록</h2>
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

export default KuroProduct;
