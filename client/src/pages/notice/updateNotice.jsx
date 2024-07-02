import React,{useState} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import './styles.css';
const UpdateNotice = () => {
    const [notice,setNotice] = useState({
        title:"",
        content:""
    });
    const location = useLocation();
    const  noticeId = location.pathname.split("/")[2]
    const handleChange = (e) =>{
        setNotice((prev) => ({...prev,[e.target.name]:e.target.value}));
    };
    console.log()
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:8080/api/notice/`+noticeId,notice);
        }catch(err){
            console.log(err);
        }

}
    return(
        <div className="Product">
            <h1>공지사항 수정하기</h1>
            <div className="product">
            <input type="text" onChange={handleChange} placeholder="제목" name="title" className="product-input"/>
            <input type="text" onChange={handleChange} placeholder="내용" name="content" className="product-input"/>
            <button onClick={handleClick}><Link to="/getnotice">수정</Link></button>
            </div>
        </div>
    )
}

export default UpdateNotice;