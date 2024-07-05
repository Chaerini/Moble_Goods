import React, { useEffect,useState,useContext,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import {
  faPlus,
  faPen,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
const SearchUser = () =>{
    const [userData, setUserData] = useState([]);
    const [searchWord, setSearchWord] = useState();
    const handleSearch = async(e) =>{
        console.log("검색어",searchWord)
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8080/api/search/user?name=${searchWord}`);
            setUserData(res.data.result);
            console.log(res.data.result);
        } catch (err) {
            console.log(err);
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }
    return(
        <div>
            
        </div>
    )
}
export default SearchUser;