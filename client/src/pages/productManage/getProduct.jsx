import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommonTable from "../../component/table/CommonTable";
import CommonTableColumn from "../../component/table/CommonTableColumn";
import CommonTableRow from "../../component/table/CommonTableRow";
import "./styles.css";
import { Link } from 'react-router-dom';
const GetProduct = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/products`);
                setData(response.data);
                console.log(apiUrl);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    const handleDelete  = async(id) =>{
        const apiUrl = process.env.REACT_APP_API_URL;
        try{
            await axios.delete(`${apiUrl}/products/`+id)
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="CommonTable">
        <CommonTable headersName={[]}>
        <ul>
            <h2>상품</h2>
            <thead>
            <tr>
                <th>번호</th>
                <th>이름</th>
                <th>수량</th>
                <th>가격</th>
                <th>할인율</th>
                <th>할인된 가격</th>
                <th>날짜</th>
                <th>이미지</th>
            </tr>
        </thead>
                {data.map((product) => (
                    <CommonTableRow key={product.id}>
                        <CommonTableColumn>{product.id}</CommonTableColumn>
                        <CommonTableColumn>{product.name}</CommonTableColumn>
                        <CommonTableColumn>{product.quantity}</CommonTableColumn>
                        <CommonTableColumn>{product.price}</CommonTableColumn>
                        <CommonTableColumn>{product.discount_rate}</CommonTableColumn>
                        <CommonTableColumn>{product.discounted_price}</CommonTableColumn>
                        <CommonTableColumn>{product.date}</CommonTableColumn>
                        <CommonTableColumn>{product.img}</CommonTableColumn>
                        <button className='delete' onClick={()=>handleDelete(product.id)}>삭제</button>
                        <button className='update'><Link to={`/updateproduct/${product.id}`}>수정</Link></button>
                    </CommonTableRow>
                 ))}
            </ul>
            </CommonTable>
            <button onClick={()=>{
                            {
                                let copy=[...data];
                                copy.sort((a,b)=>a.price<b.price?1:-1);
                                setData(copy);
                            }
                        }}>가격순 정렬</button>
            <button onClick={()=>{
                            {
                                let copy=[...data];
                                copy.sort((a,b)=>a.id<b.id?1:-1);
                                setData(copy);
                            }
                        }}>번호순 정렬</button>
            <button><Link to="/addProduct">상품추가하기</Link></button>
        </div>
    );
};
export default GetProduct;