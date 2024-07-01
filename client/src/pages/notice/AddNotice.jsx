import { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Product = () =>{
    const apiUrl=process.env.REACT_APP_API_URL
    const [product,setProduct] = useState({
        title:"",
        content:""
    });
    const handleChange = (e) =>{
        setProduct((prev) => ({...prev,[e.target.name]:e.target.value}));
    };
    console.log(product)
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post(`${apiUrl}/notice`,product);
        }catch(err){
            console.log(err);
        }

}
    return(
        <div className="addNotice">
            <h1>공지사항 추가하기</h1>
            <input type="text" onChange={handleChange} placeholder="이름" name="title"/>
            <input type="text" onChange={handleChange} placeholder="내용" name="content"/>
            <button onClick={handleClick}>추가</button>
        </div>
    )
}

export default Product;