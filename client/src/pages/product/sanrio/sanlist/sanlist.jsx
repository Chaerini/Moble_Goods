import React from 'react';
import { Link } from 'react-router-dom';
import './sanlist.css';
import Header from '../../../../component/header/header';
import Navbar from '../../../../component/navbar/navbar';
import Footer from '../../../../component/footer/footer';

function Sanrio() {
  return (
    <>
    <Header/>
    <Navbar/>
    <div className="sanrio">
      <h1>산리오 상품 목록</h1>
      <div className="product-list">
        <Link to="/sanrio/pomproduct">
          <div className="product-card">폼폼푸린</div>
        </Link>
        <Link to="/sanrio/cinnaproduct">
          <div className="product-card">시나모롤</div>
        </Link>
        <Link to="/sanrio/kuroproduct">
          <div className="product-card">쿠로미</div>
        </Link>
        <Link to="/sanrio/kittyproduct">
          <div className="product-card">헬로키티</div>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Sanrio;
