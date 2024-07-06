import React,{useState} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../productManage/productmanage.css"
const UpdateUserMember = () => {
    const [user,setUser] = useState({
        membership_id:""
    });
    const location = useLocation();
    const  userId = location.pathname.split("/")[2]
    const handleChange = (e) =>{
        setUser((prev) => ({...prev,[e.target.name]:e.target.value}));
    };
    console.log(user)
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:8080/api/users/membership/`+userId,user);
        }catch(err){
            console.log("error",err);
            console.log("user",user);
        }
}
return (
        <div className="Product">
            <h1>멤버십 정보 수정하기</h1>
            <div className="product">
            <input type="text" onChange={handleChange} placeholder="멤버십 아이디" name="membership_id" className="product-input"/>
            <button onClick={handleClick}><Link to="/getuser">수정</Link></button>
            </div>
        </div>
    );
}
export default UpdateUserMember;