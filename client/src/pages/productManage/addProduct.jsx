import { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Product = () =>{
    const navigate=useNavigate();
    const apiUrl=process.env.REACT_APP_API_URL
    const [product,setProduct] = useState({
        name:"",
        price:"",
        quantity:"",
        discount_rate:"",
        discounted_price:"",
    });
    const handleChange = (e) =>{
        setProduct((prev) => ({...prev,[e.target.name]:e.target.value}));
    };
    console.log(product)
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.post(`http://localhost:8080/api/products`,product);
        }catch(err){
            console.log(err);
        }

}
    return(
        <div className="login">
            <div className="login-container">
            <label>상품 추가하기</label>
            <div className="login-input-wrap">
            <input type="text" onChange={handleChange} placeholder="이름" name="name" className="login-input"/>
            <input type="number" onChange={handleChange} placeholder="가격" name="price" className="login-input"/>
            <input type="number" onChange={handleChange} placeholder="수량" name="quantity" className="login-input"/>
            <input type="number" onChange={handleChange} placeholder="할인율" name="discount_rate" className="login-input"/>
            <input type="number" onChange={handleChange} placeholder="할인된 가격" name="discounted_price" className="login-input"/>
            </div>
            <button onClick={handleClick} className="login-button" type="submit"><Link to="/getproduct">추가</Link></button>
            </div>
        </div>
    )
}
export default Product;