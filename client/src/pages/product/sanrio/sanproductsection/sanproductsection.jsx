import React from 'react';
import { Link } from 'react-router-dom';
import './sanproductsection.css';

function SanProductSection({ id, title, products }) {
  return (
    <div className="product-section" id={id}>
      <h2>{title}</h2>
      <div className="product-list">
        {products.map(product => (
          <Link to={`/sanrio/${id}/${product.id}`} key={product.id}>
            <div className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="section-divider"></div>
    </div>
  );
}

export default SanProductSection;
