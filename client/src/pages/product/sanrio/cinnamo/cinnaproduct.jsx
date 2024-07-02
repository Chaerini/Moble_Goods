import React from 'react';
import './cinnaproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function CinnaProduct() {
  const products = [
    { id: 1, name: '시나모롤 인형', price: '₩25,000', image: '/images/cinna1.jpg' },
    { id: 2, name: '시나모롤 쿠션', price: '₩30,000', image: '/images/cinna2.jpg' },
    { id: 3, name: '시나모롤 키링', price: '₩15,000', image: '/images/cinna3.jpg' },
    { id: 4, name: '시나모롤 머그컵', price: '₩12,000', image: '/images/cinna4.jpg' },
  ];

  return (
    <>
    <Header/>
    <Navbar/>
    <div className="cinnaproduct">
      <h2>시나모롤 상품 목록</h2>
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

export default CinnaProduct;
