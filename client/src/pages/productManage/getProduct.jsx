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
                const response = await axios.get(`http://localhost:8080/api/products`);
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
            await axios.delete(`http://localhost:8080/api/products/`+id)
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="CommonTable">
        <CommonTable headersName={[]}>
        <ul>
            <h2 className='product'>상품</h2>
            <thead>
            <tr className='tr'>
                <th className='th'>번호</th>
                <th className='th'>이름</th>
                <th className='th'>수량</th>
                <th className='th'>가격</th>
                <th className='th'>할인율</th>
                <th className='th'>할인된 가격</th>
                <th className='th'>날짜</th>
                <th className='th'>이미지</th>
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
                        <button className='btn' onClick={()=>handleDelete(product.id)}>삭제</button>
                        <button className='btn'><Link to={`/updateproduct/${product.id}`}>수정</Link></button>
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
                        }} className='btn'>가격순 정렬</button>
            <button onClick={()=>{
                            {
                                let copy=[...data];
                                copy.sort((a,b)=>a.id<b.id?1:-1);
                                setData(copy);
                            }
                        }} className='btn'>번호순 정렬</button>
            <button><Link to="/addProduct" className='btn'>상품추가하기</Link></button>
        </div>
    );
};
export default GetProduct;