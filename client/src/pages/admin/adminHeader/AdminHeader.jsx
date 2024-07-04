// AdminHeader.jsx
import React from "react";
import "./adminHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser
} from "@fortawesome/free-solid-svg-icons";

const AdminHeader = () => {
  return (
    <div className="header-container">
      <div className="header-profile">
        <FontAwesomeIcon icon={faCircleUser} className="header-profile-icon" />
        <div className="header-profile-info">
          <p className="header-profile-name">이름름</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
