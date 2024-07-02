import React from 'react';
import { Link } from 'react-router-dom';
import './ghlist.css';
import Navbar from '../../../../component/navbar/navbar';
import Header from '../../../../component/header/header';
import Footer from '../../../../component/footer/footer';

function ghibli() {
  return (
    <>
    <Header/>
    <Navbar/>
    <div className="ghibli">
      <h1>지브리 상품 목록</h1>
      <div className="product-list">
        <Link to="/ghibli/castle">
          <div className="product-card">하울의 움직이는 성</div>
        </Link>
        <Link to="/ghibli/ponyo">
          <div className="product-card">벼랑위의 포뇨</div>
        </Link>
        <Link to="/ghibli/totoro">
          <div className="product-card">이웃집 토토로</div>
        </Link>
        <Link to="/ghibli/spiriteaway">
          <div className="product-card">센과 치히로의 행방불명</div>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ghibli;
