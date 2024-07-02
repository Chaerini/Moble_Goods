import React from 'react';
import { Link } from 'react-router-dom';
import './sanlist.css';

function Sanrio() {
  return (
    <div className="sanrio">
      <h1>산리오 상품 목록</h1>
      <div className="product-list">
        <Link to="/sanrio/pompompurin">
          <div className="product-card">폼폼푸린</div>
        </Link>
        <Link to="/sanrio/cinnamoroll">
          <div className="product-card">시나모롤</div>
        </Link>
        <Link to="/sanrio/kuromi">
          <div className="product-card">쿠로미</div>
        </Link>
        <Link to="/sanrio/hellokitty">
          <div className="product-card">헬로키티</div>
        </Link>
      </div>
    </div>
  );
}

export default Sanrio;
