import React from "react";
import { Link } from "react-router-dom";

function Main(){
return(
    <div>
        <label>메인 페이지입니다.</label>
        <button><Link to="/getproduct">상품 리스트 보기</Link></button>
    </div>
)
}
export default Main