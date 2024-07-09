import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
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

  const navigate = useNavigate();

  const handleMenuClick = (componentName) => {
    console.log("클릭한 메뉴:", componentName);
    if (typeof setActiveComponent === "function") {
      setActiveComponent(componentName);
    } else {
      console.error("setActiveComponent is not a function");
    }
  };

  const { user, dispatch } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.isLoggedIn) {
      setIsLoggedIn(true);
      setUsername(storedUser.name);
      dispatch({ type: "LOGIN_SUCCESS", payload: storedUser }); // 로컬 스토리지에서 가져온 정보를 AuthContext에 반영
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  const handleGotoMain = () => {
    navigate("/");
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-logo-box" onClick={handleGotoMain}>
        <div className="sidebar-logo-image">
          <img src="/images/로고.png" className="sidebar-logo" alt="로고" />
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
          <li onClick={() => handleMenuClick("Myqna")}>
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
