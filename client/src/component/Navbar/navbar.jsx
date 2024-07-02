import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import './navbar.css';

function Navbar() {
  const [isHoveringSanrio, setIsHoveringSanrio] = useState(false);
  const [isHoveringDisney, setIsHoveringDisney] = useState(false);
  const [isHoveringGhibli, setIsHoveringGhibli] = useState(false);
  const [isHoveringMarvel, setIsHoveringMarvel] = useState(false);
  const [isHoveringMobile, setIsHoveringMobile] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleMouseEnterSanrio = () => {
    setIsHoveringSanrio(true);
  };

  const handleMouseLeaveSanrio = () => {
    setIsHoveringSanrio(false);
  };

  const handleMouseEnterDisney = () => {
    setIsHoveringDisney(true);
  };

  const handleMouseLeaveDisney = () => {
    setIsHoveringDisney(false);
  };

  const handleMouseEnterGhibli = () => {
    setIsHoveringGhibli(true);
  };

  const handleMouseLeaveGhibli = () => {
    setIsHoveringGhibli(false);
  };

  const handleMouseEnterMarvel = () => {
    setIsHoveringMarvel(true);
  };

  const handleMouseLeaveMarvel = () => {
    setIsHoveringMarvel(false);
  };

  const handleMouseEnterMobile = () => {
    setIsHoveringMobile(true);
  };

  const handleMouseLeaveMobile = () => {
    setIsHoveringMobile(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Query:", searchQuery);
    // 검색 처리 로직을 여기에 추가
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links">
          <div
            className="navbar-item"
            onMouseEnter={handleMouseEnterSanrio}
            onMouseLeave={handleMouseLeaveSanrio}
          >
            <Link to="/sanrio">산리오</Link>
            {isHoveringSanrio && (
              <div className="dropdown">
                <div className="dropdown-content">
                  <div className="dropdown-row">
                    <div className="dropdown-column">
                      <h3>상품</h3>
                      <Link to="/sanrio/pompompurin">폼폼푸린</Link>
                      <Link to="/sanrio/cinnamoroll">시나모롤</Link>
                      <Link to="/sanrio/kuromi">쿠로미</Link>
                      <Link to="/sanrio/hellokitty">헬로키티</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="navbar-item"
            onMouseEnter={handleMouseEnterDisney}
            onMouseLeave={handleMouseLeaveDisney}
          >
            <Link to="/disney">디즈니</Link>
            {isHoveringDisney && (
              <div className="dropdown">
                <div className="dropdown-content">
                  <div className="dropdown-row">
                    <div className="dropdown-column">
                      <h3>상품</h3>
                      <Link to="/disney/frozen">겨울왕국</Link>
                      <Link to="/disney/rapunzel">라푼젤</Link>
                      <Link to="/disney/littlemermaid">인어공주</Link>
                      <Link to="/disney/insideout">인사이드아웃</Link>

                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="navbar-item"
            onMouseEnter={handleMouseEnterGhibli}
            onMouseLeave={handleMouseLeaveGhibli}
          >
            <Link to="/ghibli">지브리</Link>
            {isHoveringGhibli && (
              <div className="dropdown">
                <div className="dropdown-content">
                  <div className="dropdown-row">
                    <div className="dropdown-column">
                      <h3>상품</h3>
                      <Link to="/ghibli/totoro">이웃집 토토로</Link>
                      <Link to="/ghibli/spiritedaway">센과 치히로의 행방불명</Link>
                      <Link to="/ghibli/howlsmovingcastle">하울의 움직이는 성</Link>
                      <Link to="/ghibli/ponyo">벼랑 위의 포뇨</Link>

                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="navbar-item"
            onMouseEnter={handleMouseEnterMarvel}
            onMouseLeave={handleMouseLeaveMarvel}
          >
            <Link to="/marvel">마블</Link>
            {isHoveringMarvel && (
              <div className="dropdown">
                <div className="dropdown-content">
                  <div className="dropdown-row">
                    <div className="dropdown-column">
                      <h3>상품</h3>
                      <Link to="/marvel/ironman">아이언맨</Link>
                      <Link to="/marvel/captainamerica">캡틴 아메리카</Link>
                      <Link to="/marvel/thor">토르</Link>
                      <Link to="/marvel/spiderman">스파이더맨</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            className="navbar-item"
            onMouseEnter={handleMouseEnterMobile}
            onMouseLeave={handleMouseLeaveMobile}
          >
            <Link to="/moble">모블</Link>
            {isHoveringMobile && (
              <div className="dropdown">
                <div className="dropdown-content">
                  <div className="dropdown-row">
                    <div className="dropdown-column">
                      <h3>상품</h3>
                      <Link to="/mobile/phonecase">폰케이스</Link>
                      <Link to="/mobile/charger">충전기</Link>
                      <Link to="/mobile/earphone">이어폰</Link>
                      <Link to="/mobile/stand">거치대</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="right-section">
          <form className={`search-form ${searchActive ? "active" : ""}`} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <FaSearch className="search-icon" onClick={() => setSearchActive(!searchActive)} />
            </button>
          </form>
          <div className="navbar-cart">
            <Link to="/cart">장바구니</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;