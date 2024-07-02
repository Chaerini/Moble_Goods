import React from 'react';
import { Link } from 'react-router-dom';
import './mvlist.css';
import Header from '../../../../component/header/header';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';

function marvel() {
  return (
    <>
    <Header/>
    <Navbar/>
    <div className="marvel">
      <h1>마블 상품 목록</h1>
      <div className="product-list">
        <Link to="/marvel/ironman">
          <div className="product-card">아이언맨</div>
        </Link>
        <Link to="/marvel/captainamerica">
          <div className="product-card">캡틴 아메리카</div>
        </Link>
        <Link to="/marvel/thor">
          <div className="product-card">토르</div>
        </Link>
        <Link to="/marvel/spiderman">
          <div className="product-card">스파이더맨</div>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default marvel;
