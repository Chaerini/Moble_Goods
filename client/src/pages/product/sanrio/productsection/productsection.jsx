import React from 'react';
import './productsection.css';

function ProductSection({ id, title, products }) {
  return (
    <section id={id} className="product-section">
      <h2>{title}</h2>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductSection;
