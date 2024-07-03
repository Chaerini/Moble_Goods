import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./adminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faG,
  faChartSimple,
  faShoppingCart,
  faUser,
  faBoxOpen,
  faChartLine,
  faClipboardList,
  faCog,
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
          <li>
            {" "}
            <div className="sidebar-menu-item" onClick={refreshPage}>
              <FontAwesomeIcon
                icon={faChartSimple}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">대시보드</p>
            </div>
          </li>
          <li>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">주문</p>
            </div>
          </li>
          <li>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon icon={faBoxOpen} className="sidebar-menu-icon" />
              <p className="sidebar-menu-text">상품</p>
            </div>
          </li>
          <li>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon icon={faUser} className="sidebar-menu-icon" />
              <p className="sidebar-menu-text">고객</p>
            </div>
          </li>
          <li>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon
                icon={faClipboardList}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">공지/문의</p>
            </div>
          </li>
          <li>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon
                icon={faChartLine}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">통계</p>
            </div>
          </li>
          <li>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon icon={faCog} className="sidebar-menu-icon" />
              <p className="sidebar-menu-text">설정</p>
            </div>
          </li>
          <li>
            <div className="sidebar-menu-item topline" onClick={handleSignOut}>
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">Sign Out</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
