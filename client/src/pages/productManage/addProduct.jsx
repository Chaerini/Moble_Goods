import { useEffect, useState } from "react";
import Axios from "axios";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
const Product = () =>{
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
            await axios.post(`${apiUrl}/products`,product);
        }catch(err){
            console.log(err);
        }

}
    return(
        <div className="addProduct">
            <h1>상품 추가하기</h1>
            <input type="text" onChange={handleChange} placeholder="이름" name="name"/>
            <input type="number" onChange={handleChange} placeholder="가격" name="price"/>
            <input type="number" onChange={handleChange} placeholder="수량" name="quantity"/>
            <input type="number" onChange={handleChange} placeholder="할인율" name="discount_rate"/>
            <input type="number" onChange={handleChange} placeholder="할인된 가격" name="discounted_price"/>
            <button onClick={handleClick}><Link to="/getproduct">추가</Link></button>
        </div>
    )
    }

export default Product;