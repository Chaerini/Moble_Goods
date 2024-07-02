import React from 'react';
import { Link } from 'react-router-dom';
import './mblist.css';

function Mblist() {
  return (
    <div className="mblist">
      <h1>모블 상품 목록</h1>
      <div className="product-list">
        <Link to="/moble/phonecase">
          <div className="product-card">폰케이스</div>
        </Link>
        <Link to="/moble/charger">
          <div className="product-card">충전기</div>
        </Link>
        <Link to="/moble/earphone">
          <div className="product-card">이어폰</div>
        </Link>
        <Link to="/moble/stand">
          <div className="product-card">거치대</div>
        </Link>
      </div>
    </div>
  );
}

export default Mblist;
