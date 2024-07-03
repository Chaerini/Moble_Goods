import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
const Search = () => {
    return (
      <div className="header-container">
        <div className="header-search">
          <div className="header-search-box">
            <div className="header-search-icon-box">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="header-search-icon"
              />
            </div>
            <input
              id="header-search"
              name="header-search"
              type="text"
              className="header-search-input"
              placeholder="Search here..."
            />
          </div>
        </div>
  
        <div className="header-profile">
          <FontAwesomeIcon icon={faCircleUser} className="header-profile-icon" />
          <div className="header-profile-info">
            <p className="header-profile-name">이름름</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Search;
  