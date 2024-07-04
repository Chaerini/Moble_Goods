import React, { useState, useEffect, useCallback } from "react";
import AdminSidebar from "../adminSidebar/AdminSidebar";
import AdminHeader from "../adminHeader/AdminHeader";
import Dashboard from "../dashboard/Dashboard";
import OrderManage from "../orderManage/OrderManage";

const AdminMain = () => {
  const [activeComponent, setActiveComponent] = useState("Dashboard");
  const [sidebarKey, setSidebarKey] = useState(0); 

  const renderComponent = useCallback(() => {
    console.log("어드민 메인:", activeComponent);
    switch (activeComponent) {
      // case "Dashboard":
      //   return <Dashboard />;
      case "OrderManage":
        return <OrderManage />;
      default:
        return <Dashboard />;
    }
  }, [activeComponent]);
  
    // activeComponent가 변경될 때마다 AdminSidebar를 다시 렌더링
    useEffect(() => {
      setSidebarKey(prevKey => prevKey + 1);
    }, [activeComponent]);
  

  return (
    <div style={{ display: "flex", margin: 0, padding: 0 }}>
      <AdminSidebar setActiveComponent={setActiveComponent} />
      <AdminHeader />
      <div style={{ margin: 0, padding: 0 }}>{renderComponent()}</div>
    </div>
  );
};

export default AdminMain;
