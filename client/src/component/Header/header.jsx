import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // 여기서 로그인 상태를 체크하는 로직을 추가합니다.
    // 예를 들어, localStorage에서 사용자 정보를 가져오는 방식으로 구현할 수 있습니다.
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.isLoggedIn) {
      setIsLoggedIn(true);
      setUsername(user.name);
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리 로직을 추가합니다.
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-top-left">
          <Link to="/" className="header-logo">Goods For YOU</Link>
        </div>
        <div className="header-top-right">
          {isLoggedIn ? (
            <>
              <span>{username}님</span>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/register">회원가입</Link>
            </>
          )}
          <Link to="/">이벤트</Link>
          <Link to="/">쿠폰·머니</Link>
          <Link to="/">주문·배송</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
