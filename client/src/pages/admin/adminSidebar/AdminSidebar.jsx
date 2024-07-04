import React from "react";
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

  const handleSignOut = () => {
    console.log("User signed out");
    // 여기에 로그아웃 로직을 추가하세요
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-logo-box">
        <FontAwesomeIcon icon={faG} className="sidebar-logo-icon" />
        <div className="sidebar-logo-text">굿포유</div>
      </div>
      <div tabindex="0" className="sidebar-menu">
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
            <div tabindex="0" className="sidebar-menu-item">
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
              <div className="sidebar-menu-item" onClick={handleSignOut}>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="sidebar-menu-icon"
                />
                <p className="sidebar-menu-text">Sign Out</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
