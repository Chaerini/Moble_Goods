import React from 'react';
import { Link } from 'react-router-dom';
import './dislist.css';

function disney() {
  return (
    <div className="disney">
      <h1>디즈니 상품 목록</h1>
      <div className="product-list">
        <Link to="/disney/frozen">
          <div className="product-card">겨울왕국</div>
        </Link>
        <Link to="/disney/rapunzel">
          <div className="product-card">라푼젤</div>
        </Link>
        <Link to="/disney/littlemermaid">
          <div className="product-card">인어공주</div>
        </Link>
        <Link to="/disney/insideout">
          <div className="product-card">인사이드아웃</div>
        </Link>
      </div>
    </div>
  );
}

export default disney;
