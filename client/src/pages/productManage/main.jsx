import React from "react";
import { Link } from "react-router-dom";
import './main.css';
import Navbar from "../../component/navbar/navbar";
import Footer from "../../component/footer/footer";
import Header from "../../component/header/header";

function Main() {
  return (
  <>
  <Header/>
  <Navbar/>
  
    <div className="main-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>이거슨 굿즈 사이트여</h1>
          <p>우리 조의 찬란한 개발기록</p>
          <p>~ 2024. 7. 5(금)</p>
          <button className="hero-button"><Link to="/event-details">이벤트 자세히 보기</Link></button>
        </div>
        <div className="hero-image">
          <img src="pic1.png" alt="Hero" />
        </div>
      </div>
      <div className="products-section">
        <div className="product">
          <img src="photo.jpg" alt="포토북" />
          <h2>포토북</h2>
          <p>이유있는 1등, 모블 포토북! 그 남다른 클래스를 경험해보세요.</p>
        </div>
        <div className="product">
          <img src="goods.jpg" alt="굿즈" />
          <h2>굿즈</h2>
          <p>안 만들 순 있어도, 한번만 만들 순 없는 마성의 매력, 모블 굿즈를 만나보세요.</p>
        </div>
        <div className="product">
          <img src="case.jpg" alt="폰케이스" />
          <h2>갤럭시 S24 폰케이스 출시</h2>
          <p>NEW 갤럭시 S24 시리즈의 폰케이스도 굿포올에서 만나 볼 수 있어요.</p>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Main;
