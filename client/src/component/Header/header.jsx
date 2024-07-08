import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import './header.css';

function Header() {
  const { user, dispatch } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-left">
          <Link to="/" className="header-logo">Goods For YOU</Link>
        </div>
        <div className="header-top-right">
          {user ? (
            <div className="user-menu">
              <span onClick={toggleDropdown} className="username">
                {user.username}님
              </span>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <Link to="/mycoupon">내 등급 혜택</Link>
                  <Link to="/profile">회원정보수정</Link>
                  <Link to="/myreview">나의 리뷰</Link>
                  {user.is_admin === 1 && (  // 관리자일 때만 표시
                    <Link to="/admin">관리자 페이지</Link>
                  )}
                  <button onClick={handleLogout}>로그아웃</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/register">회원가입</Link>
            </>
          )}
          <Link to="/">이벤트</Link>
          <Link to="/">쿠폰·머니</Link>
          <Link to="/myorder">주문·배송</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
