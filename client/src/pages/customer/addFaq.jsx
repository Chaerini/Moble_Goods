import { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AdminSidebar from "../admin/adminSidebar/AdminSidebar";
import Search from "../../component/search/searchProduct";
const AddFaq = () =>{
    const [Faq,setFaq] = useState({
        title:"",
        contents:""
    });
    const handleChange = (e) =>{
        setFaq((prev) => ({...prev,[e.target.name]:e.target.value}));
    };
    const handleClick = async e =>{
        e.preventDefault()
        try{
            console.log("====질문=====",Faq)
            await axios.post(`http://localhost:8080/api/asks`,Faq);
            console.log("추가완료");
        }catch(err){
            console.log("error",err);
        }
}
    return(
        <div className="login">
            <div className="login-container">
            <h2>질문 추가하기</h2>
            <input type="text" onChange={handleChange} placeholder="제목" name="title" className="login-input"/>
            <input type="text" onChange={handleChange} placeholder="내용" name="contents" className="login-input"/>
            <button onClick={handleClick} className="btn"><Link to="/faq">추가</Link></button>
            </div>
        </div>
    )
}
export default AddFaq;