import React,{useState} from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import './product.css';
const UpdateProduct = () => {
    const [product,setProduct] = useState({
        name:"",
        price:"",
        quantity:"",
        discount_rate:"",
        discounted_price:"",
    });
    const location = useLocation();
    const  productId = location.pathname.split("/")[2]
    const handleChange = (e) =>{
        setProduct((prev) => ({...prev,[e.target.name]:e.target.value}));
    };
    console.log(product)
    const handleClick = async e =>{
        e.preventDefault()
        try{
            await axios.put(`http://localhost:8080/api/products/`+productId,product);
        }catch(err){
            console.log(err);
        }

}
    return(
        <div className="Product">
            <div className="product">
            <label>상품 수정하기</label>
            <input type="text" onChange={handleChange} placeholder="이름" name="name" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="가격" name="price" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="수량" name="quantity" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="할인율" name="discount_rate" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="할인된 가격" name="discounted_price" className="product-input"/>
            <button onClick={handleClick}><Link to="/getproduct" className="btn">수정</Link></button>
            </div>
        </div>
    )
}

export default UpdateProduct