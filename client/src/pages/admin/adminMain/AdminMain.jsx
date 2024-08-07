import React, { useState, useEffect, useCallback } from "react";

import AdminSidebar from "../adminSidebar/AdminSidebar";
import AdminHeader from "../adminHeader/AdminHeader";
import Dashboard from "../dashboard/Dashboard";
import OrderManage from "../orderManage/OrderManage";
import ProductManage from "../../productManage/getProduct";
import UserManage from "../../userManage/getUser";
import GetNotice from "../../notice/GetNotice";
import Myqna from "../../customer/Myqna";

const AdminMain = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  // const [sidebarKey, setSidebarKey] = useState(0);

  const renderComponent = useCallback(() => {
    console.log("어드민 메인:", activeComponent);
    switch (activeComponent) {
      case "OrderManage": // 주문
        return <OrderManage />;
      case "ProductManage": // 상품
        return <ProductManage />;
      case "UserManage": // 고객
        return <UserManage />;
      case "Myqna": //문의
        return <Myqna />;
      case "GetNotice": //공지
        return <GetNotice />;
      default:
        return <Dashboard />;
    }
  }, [activeComponent]);

  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        width: "100vw",
        height: "100vh",
        position: "fixed",
        backgroundColor: "var(--c-lightgray)",
      }}
    >
      <AdminSidebar setActiveComponent={setActiveComponent} />
      <AdminHeader />
      <div
        style={{
          display: "flex",
          margin: "0 0 0 300px",
          width: "calc(100vw - 300px)",
          height: "calc(100vh - 70px)",
          padding: "20px",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminMain;
