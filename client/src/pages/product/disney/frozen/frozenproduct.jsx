import React from 'react';
import './frozenproduct.css';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';
import Header from '../../../../component/header/header';

function FrozenProduct() {
  const products = [
    { id: 1, name: '겨울왕국 인형', price: '₩25,000', image: '/images/frozen1.jpg' },
    { id: 2, name: '겨울왕국 쿠션', price: '₩30,000', image: '/images/frozen2.jpg' },
    { id: 3, name: '겨울왕국 키링', price: '₩15,000', image: '/images/frozen3.jpg' },
    { id: 4, name: '겨울왕국 머그컵', price: '₩12,000', image: '/images/frozen4.jpg' },
  ];

  return (
    <>
      <Header/>
      <Navbar/>
      <div className="frozenproduct">
        <h2>겨울왕국 상품 목록</h2>
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

export default FrozenProduct;
