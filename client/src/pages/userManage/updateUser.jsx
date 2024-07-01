import React,{useState} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../productManage/styles.css"
const UpdateUser = () => {
    const apiUrl=process.env.REACT_APP_API_URL
    const [user,setUser] = useState({
        name:"",
        username:"",
        address:"",
        memebership_id:"",
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
            await axios.put(`http://localhost:8080/api/products/`+userId,user);
        }catch(err){
            console.log(err);
        }

}
return (
        <div className="updateUser">
            <h1>고객정보 수정하기</h1>
            <input type="text" onChange={handleChange} placeholder="이름" name="name" className="product-input"/>
            <input type="text" onChange={handleChange} placeholder="아이디" name="username" className="product-input"/>
            <input type="text" onChange={handleChange} placeholder="주소" name="address" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="멤버십 아이디" name="discount_rate" className="product-input"/>
            <button onClick={handleClick}><Link to="/getproduct">수정</Link></button>
        </div>
);
}

export default UpdateUser;