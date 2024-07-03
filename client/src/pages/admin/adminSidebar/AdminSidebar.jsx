import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

const AdminSidebar = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  const handleSignOut = () => {
    // 로그아웃 함수
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-logo-box">
        <FontAwesomeIcon icon={faG} className="sidebar-logo-icon" />
        <div className="sidebar-logo-text">굿포유</div>
      </div>
      <div className="sidebar-menu">
        <ul className="sidebar-menu-list">
          <li onClick={refreshPage}>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon
                icon={faChartSimple}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">대시보드</p>
            </div>
          </li>
          <li id="order">
            <Link to="order" className="sidebar-link">
              <div className="sidebar-menu-item">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="sidebar-menu-icon"
                />
                <p className="sidebar-menu-text">주문</p>
              </div>
            </Link>
          </li>
          <li id="product">
            <Link to="product" className="sidebar-link">
              <div className="sidebar-menu-item">
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="sidebar-menu-icon"
                />
                <p className="sidebar-menu-text">상품</p>
              </div>
            </Link>
          </li>
          <li id="customer">
            <Link to="customer" className="sidebar-link">
              <div className="sidebar-menu-item">
                <FontAwesomeIcon icon={faUser} className="sidebar-menu-icon" />
                <p className="sidebar-menu-text">고객</p>
              </div>
            </Link>
          </li>
          <li id="board">
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
