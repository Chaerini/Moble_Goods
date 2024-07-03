import React from 'react';
import { Link } from 'react-router-dom';
import './dislist.css';
import Header from '../../../../component/header/header';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';

function disney() {
  return (
    <>
    <Header/>
    <Navbar/>
    <div className="disney">
      <h1>디즈니 상품 목록</h1>
      <div className="product-list">
        <Link to="/disney/frozenproduct">
          <div className="product-card">겨울왕국</div>
        </Link>
        <Link to="/disney/rapunzelproduct">
          <div className="product-card">라푼젤</div>
        </Link>
        <Link to="/disney/littleproduct">
          <div className="product-card">인어공주</div>
        </Link>
        <Link to="/disney/insideoutproduct">
          <div className="product-card">인사이드아웃</div>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default disney;
