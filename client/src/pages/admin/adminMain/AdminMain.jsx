import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

import AdminSidebar from "../adminSidebar/AdminSidebar";
import AdminHeader from "../adminHeader/AdminHeader";
import Dashboard from "../dashboard/Dashboard";
import OrderManage from "../orderManage/OrderManage";
import ProductManage from "../../productManage/getProduct";
import UserManage from "../../userManage/getUser";
import getNotice from "../../notice/getNotice";

const AdminMain = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  // const [sidebarKey, setSidebarKey] = useState(0);

  const renderComponent = useCallback(() => {
    console.log("어드민 메인:", activeComponent);

    //유저가 어드민인지 조회
    // const apiUrl = process.env.REACT_APP_API_URL;
    // const navigate = useNavigate();
    // const { user } = useContext(AuthContext);


    switch (activeComponent) {
      case "OrderManage":
        return <OrderManage />;
      case "ProductManage":
        return <ProductManage />;
      case "UserManage":
        return <UserManage />;
      case "getNotice":
        return <getNotice />;
      default:
        return <Dashboard />;
    }
  }, [activeComponent]);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <AdminSidebar setActiveComponent={setActiveComponent} />
      <AdminHeader />
      <div style={{ margin: 0, padding: 0 }}>{renderComponent()}</div>
    </div>
  );
};

export default AdminMain;
