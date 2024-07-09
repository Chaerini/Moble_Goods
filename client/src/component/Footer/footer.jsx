import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* <img src={FitLogo} alt="F I T" className="footer-logo" /> */}
        <div className="footer-links">
          <Link to="/UserNotice" className="footer-link">공지사항</Link>
          <Link to="/faq" className="footer-link">FAQ</Link>
        </div>
      </div>
      <div className="footer-middle">
        <div className="footer-company-info">
          <p>굿포유 대표이사: 이채린</p>
          <p>사업자등록번호: 202-40-70912</p>
          <p>통신판매신고: 2024-충남천안-1925</p>
          <p>개인정보관리책임자: 김제홍 천안시 모블교육센터</p>
          <p>호스팅 제공: 아마존 웹서비스 (Amazon Web Services)</p>
          <p>고객만족센터: 1577-1577</p>
        </div>
        <div className="footer-language-selector">
          <select>
            <option value="ko">한국어</option>
            <option value="en">English</option>
            <option value="ch">中國語</option>
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
