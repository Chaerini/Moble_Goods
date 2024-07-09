import React, { useState, useEffect } from "react";
import "./adminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faShoppingCart,
  faUser,
  faBoxOpen,
  faClipboardList,
  faSignOutAlt,
  faHeadset,
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
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.isLoggedIn) {
      setIsLoggedIn(true);
      setUsername(user.name);
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 코드 추가
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-logo-box">
        <div className="sidebar-logo-image">
          <img src="/images/로고.png" className="sidebar-logo" />
        </div>
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
          <li onClick={() => handleMenuClick("GetNotice")}>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon icon={faHeadset} className="sidebar-menu-icon" />
              <p className="sidebar-menu-text">1:1 문의</p>
            </div>
          </li>
          <li onClick={() => handleMenuClick("GetNotice")}>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon
                icon={faClipboardList}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">공지사항</p>
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
