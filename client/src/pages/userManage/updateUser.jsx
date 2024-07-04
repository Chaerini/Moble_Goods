import React,{useState} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../productManage/product.css"
const UpdateUser = () => {
    const [user,setUser] = useState({
        name:"",
        address:"",
        phone:"",
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
            await axios.put(`http://localhost:8080/api/users/`+userId,user);
        }catch(err){
            console.log("error",err);
            console.log("user",user);
        }
}
return (
        <div className="Product">
            <div className="product">
            <label>고객정보 수정하기</label>
            <input type="text" onChange={handleChange} placeholder="이름" name="name" className="product-input"/>
            <input type="text" onChange={handleChange} placeholder="주소" name="address" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="핸드폰" name="phone" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="멤버십" name="membership_id" className="product-input"/>
            <button onClick={handleClick}><Link to="/getuser" className="btn">수정</Link></button>
            </div>
        </div>
        
    );
    
}
export default UpdateUser;