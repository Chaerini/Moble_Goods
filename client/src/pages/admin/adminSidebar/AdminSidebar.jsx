import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
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
import OrderManage from "../orderManage/OrderManage";
import Dashboard from "../dashboard/Dashboard";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleItemClick = (itemId) => {
    switch (itemId) {
      case "1":
        navigate("/admin/order");
        break;
      case "2":
        navigate("/admin/product");
        break;
      case "3":
        navigate("/admin/customer");
        break;
      case "4":
        navigate("/admin/board");
        break;
      default:
        navigate("/admin");
    }
  };

  const renderComponent = useMemo(() => {
    switch (id) {
      case "order":
        return <OrderManage />;
      // case "product":
      //   return <ProductManage />;
      // case "customer":
      //   return <CustomerManage />;
      // case "board":
      //   return <BoardManage />;
      // default:
        return <Dashboard />;
    }
  }, [id]);

  const gotoDashboard = () => {
    navigate("/admin");
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
          <li onClick={gotoDashboard}>
            <div className="sidebar-menu-item">
              <FontAwesomeIcon
                icon={faChartSimple}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">대시보드</p>
            </div>
          </li>

          <li id="1">
            <div className="sidebar-menu-item">
              <FontAwesomeIcon
                icon={faShoppingCart}
                className="sidebar-menu-icon"
              />
              <p className="sidebar-menu-text">주문</p>
            </div>
          </li>
          <li id="2">
            <div className="sidebar-menu-item">
              <FontAwesomeIcon icon={faBoxOpen} className="sidebar-menu-icon" />
              <p className="sidebar-menu-text">상품</p>
            </div>
          </li>
          <li id="3">
            <div className="sidebar-menu-item">
              <FontAwesomeIcon icon={faUser} className="sidebar-menu-icon" />
              <p className="sidebar-menu-text">고객</p>
            </div>
          </li>
          <li id="4">
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
