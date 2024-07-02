import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import CommonTable from '../productManage/CommonTable';
import CommonTableColumn from '../productManage/CommonTableColumn';
import CommonTableRow from '../productManage/CommonTableRow';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
const GetCoupon = () => {
    const [data, setData] = useState([]);
    const {user}=useContext(AuthContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/coupons`,{
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                      },
                });
                setData(response.data);
                console.log("data",data);
                console.log("token",user.token);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    const handleDelete  = async(id) =>{
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
        </div>
    );
};
export default GetCoupon;