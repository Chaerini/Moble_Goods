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
            await axios.post(`http://localhost:8080/api/products`,product);
        }catch(err){
            console.log(err);
        }

}
    return(
        <div className="Product">
            <h1>상품 추가하기</h1>
            <div className="product">
            <input type="text" onChange={handleChange} placeholder="이름" name="name" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="가격" name="price" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="수량" name="quantity" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="할인율" name="discount_rate" className="product-input"/>
            <input type="number" onChange={handleChange} placeholder="할인된 가격" name="discounted_price" className="product-input"/>
            <input type="file" name="img1" accept="img/*"></input>
            <button onClick={handleClick}><Link to="/getproduct" className="btn" type="submit">추가</Link></button>
            </div>
        </div>
    )
}
export default Product;