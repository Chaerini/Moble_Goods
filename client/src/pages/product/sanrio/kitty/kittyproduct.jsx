import React from 'react';
import './kittyproduct.css';

function KittyProduct() {
  const products = [
    { id: 1, name: '헬로키티 인형', price: '₩25,000', image: '/images/kitty1.jpg' },
    { id: 2, name: '헬로키티 쿠션', price: '₩30,000', image: '/images/kitty2.jpg' },
    { id: 3, name: '헬로키티 키링', price: '₩15,000', image: '/images/kitty3.jpg' },
    { id: 4, name: '헬로키티 머그컵', price: '₩12,000', image: '/images/kitty4.jpg' },
  ];

  return (
    <div className="kittyproduct">
      <h2>헬로키티 상품 목록</h2>
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
  );
}

export default KittyProduct;
