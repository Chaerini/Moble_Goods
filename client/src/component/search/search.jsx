import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
const Search = ({value,onChange}) => {
    const [product,setProduct]=useState([]);
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
              type="search"
              value={value}
              onChange={onChange}
              className="header-search-input"
              placeholder="Search here..."
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default Search;
  