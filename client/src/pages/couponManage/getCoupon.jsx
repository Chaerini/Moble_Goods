import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommonTable from "../../component/table/CommonTable";
import CommonTableColumn from "../../component/table/CommonTableColumn";
import CommonTableRow from "../../component/table/CommonTableRow";
import "../productManage/styles.css";
import { Link } from 'react-router-dom';
const GetCoupon = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/coupons`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    const handleDelete  = async(id) =>{
        const apiUrl = process.env.REACT_APP_API_URL;
        try{
            await axios.delete(`http://localhost:8080/api/coupons/`+id)
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className="CommonTable">
        <CommonTable headersName={[]}>
        <ul>
            <h2 className='product'>쿠폰</h2>
            <thead>
            <tr>
                <th className='th'>이름</th>
                <th className='th'>할인가격</th>
                <th className='th'>시작일</th>
                <th className='th'>만료일</th>
                <th className='th'>조건</th>
            </tr>
        </thead>
                {data.map((coupon) => (
                    <CommonTableRow key={coupon.id}>
                        <CommonTableColumn>{coupon.name}</CommonTableColumn>
                        <CommonTableColumn>{coupon.discount}</CommonTableColumn>
                        <CommonTableColumn>{coupon.start_date}</CommonTableColumn>
                        <CommonTableColumn>{coupon.end_date}</CommonTableColumn>
                        <CommonTableColumn>{coupon.conditions}</CommonTableColumn>
                        <button className='delete' onClick={()=>handleDelete(coupon.id)}>삭제</button>
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
export default GetCoupon;