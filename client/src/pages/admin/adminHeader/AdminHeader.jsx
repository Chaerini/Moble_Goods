import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./adminHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from '../../../Context/AuthContext';

const AdminHeader = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  useEffect(() => {
    if (!user) {
      alert("관리자 정보가 없습니다. 로그인 페이지로 이동합니다.");
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="header-container">
      {user && (
        <div className="header-profile">
          <FontAwesomeIcon icon={faCircleUser} className="header-profile-icon" />
          <div className="header-profile-info">
            <p className="header-profile-name">{user.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHeader;
