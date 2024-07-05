import React, { useState, useEffect } from "react";
import "./adminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faG,
  faChartSimple,
  faShoppingCart,
  faUser,
  faBoxOpen,
  faClipboardList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const AdminSidebar = ({ setActiveComponent }) => {
  console.log("사이드바:", typeof setActiveComponent);

  const handleMenuClick = (componentName) => {
    console.log("클릭한 메뉴:", componentName);
    if (typeof setActiveComponent === "function") {
      setActiveComponent(componentName);
    } else {
      console.error("setActiveComponent is not a function");
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // 여기서 로그인 상태를 체크하는 로직을 추가합니다.
    // 예를 들어, localStorage에서 사용자 정보를 가져오는 방식으로 구현할 수 있습니다.
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isLoggedIn) {
      setIsLoggedIn(true);
      setUsername(user.name);
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리 로직을 추가합니다.
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-logo-box">
        {/* <FontAwesomeIcon icon={faG} className="sidebar-logo-icon" /> */}
        <div className="sidebar-logo-text">Goods For YOU</div>
      </div>
      <div className="sidebar-menu">
        <ul className="sidebar-menu-list">
          <li onClick={() => handleMenuClick("Dashboard")}>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon
                icon={faChartSimple}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">대시보드</p>
            </div>
          </li>
          <li onClick={() => handleMenuClick("OrderManage")}>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">주문</p>
            </div>
          </li>
          <li onClick={() => handleMenuClick("ProductManage")}>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon icon={faBoxOpen} className="sidebar-menu-icon" />
              <p className="sidebar-menu-text">상품</p>
            </div>
          </li>
          <li onClick={() => handleMenuClick("UserManage")}>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon icon={faUser} className="sidebar-menu-icon" />
              <p className="sidebar-menu-text">고객</p>
            </div>
          </li>
          <li onClick={() => handleMenuClick("getNotice")}>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon
                icon={faClipboardList}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">공지/문의</p>
            </div>
          </li>
          <li>
            <div className="sidebar-menu-line">
              <div className="sidebar-menu-item" onClick={handleLogout}>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="sidebar-menu-icon"
                />
                <p className="sidebar-menu-text">로그아웃</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
