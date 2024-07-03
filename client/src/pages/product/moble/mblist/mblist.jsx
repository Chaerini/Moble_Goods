import React from 'react';
import { Link } from 'react-router-dom';
import './mblist.css';
import Navbar from '../../../../component/navbar/navbar';
import Header from '../../../../component/header/header';
import Footer from '../../../../component/footer/footer';

function Mblist() {
  return (
    <>
    <Header/>
    <Navbar/>
    <div className="mblist">
      <h1>모블 상품 목록</h1>
      <div className="product-list">
        <Link to="/moble/phonecaseproduct">
          <div className="product-card">폰케이스</div>
        </Link>
        <Link to="/moble/chargerproduct">
          <div className="product-card">충전기</div>
        </Link>
        <Link to="/moble/earphoneproduct">
          <div className="product-card">이어폰</div>
        </Link>
        <Link to="/moble/standproduct">
          <div className="product-card">거치대</div>
        </Link>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Mblist;
