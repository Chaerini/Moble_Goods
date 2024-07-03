import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import CommonTable from "./CommonTable";
import CommonTableColumn from "./CommonTableColumn";
import CommonTableRow from "./CommonTableRow";
import { Link } from 'react-router-dom';
import AdminHeader from '../admin/adminHeader/AdminHeader';
import AdminSidebar from '../admin/adminSidebar/AdminSidebar';
import { AuthContext } from '../../Context/AuthContext';
const GetProduct = () => {
    let [data, setData] = useState([]);
    const {user}=useContext(AuthContext)
    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products`,{
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                      },
                });
                setData(response.data);
                console.log("data",data);
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
                <th className='th'>이름</th>
                <th className='th'>수량</th>
                <th className='th'>가격</th>
                <th className='th'>할인율</th>
                <th className='th'>할인된 가격</th>
                <th className='th'>날짜</th>
            </tr>
        </thead>
                {data.map((product) => (
                    <tr key={product.id} className='tr'>
                        <th className='th'>{product.name}</th>
                        <th className='th'>{product.quantity}</th>
                        <th className='th'>{product.price}</th>
                        <th className='th'>{product.discount_rate}</th>
                        <th className='th'>{product.discounted_price}</th>
                        <th className='th'>{product.date}</th>
                        <button className='btn' onClick={()=>handleDelete(product.id)}>삭제</button>
                        <button className='btn'><Link to={`/updateproduct/${product.id}`}>수정</Link></button>
                    </tr>
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
            <button><Link to="/addProduct" className='btn'>상품추가하기</Link></button>
        </div>
    );
};
export default GetProduct;