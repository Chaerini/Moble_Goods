import React,{useState} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../productManage/product.css"
const UpdateUser = () => {
    const [user,setUser] = useState({
        name:"",
        address:"",
        phone:""
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
            await axios.put(`http://localhost:8080/api/users/`+userId,user);
        }catch(err){
            console.log("error",err);
            console.log("user",user);
        }
}
    const handlMemberClick = async e =>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:8080/api/users/membership`+userId,user);
        }catch(err){
            console.log("error",err);
        }
    }
return (
        <div className="Product">
            <h1>고객정보 수정하기</h1>
            <div className="product">
            <input type="text" onChange={handleChange} placeholder="이름" name="name" className="product-input"/>
            <input type="text" onChange={handleChange} placeholder="주소" name="address" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="핸드폰" name="phone" className="product-input"/>
            <button onClick={handleClick}><Link to="/getuser" className="btn">수정</Link></button>
            </div>
        </div>
    );
}
export default UpdateUser;