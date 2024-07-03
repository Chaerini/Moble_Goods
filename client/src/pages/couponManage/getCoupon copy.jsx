import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import CommonTable from '../productManage/CommonTable';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
const GetCoupon = () => {
    let [data, setData] = useState([]);
    let [coupon,setCoupon]=useState([])
    const {user}=useContext(AuthContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/coupons`,                );
                setCoupon(response.data.result);
                console.log("data",data);
                console.log("token",user.token);
                console.log("response.data.rows : ",response.data.result)
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
        {coupon.map((coupon) => (
                    <tr key={coupon.id} className='tr'>
                        <th className='th'>{coupon.name}</th>
                        <th className='th'>{coupon.discount}</th>
                        <th className='th'>{coupon.start_date}</th>
                        <th className='th'>{coupon.end_date}</th>
                        <th className='th'>{coupon.conditions}</th>
                        <button className='btn' onClick={()=>handleDelete(coupon.id)}>삭제</button>
                        <button className='btn'><Link to={`/updatecoupon/${coupon.id}`}>수정</Link></button>
                        <button className='btn'><Link to="/addcoupon">쿠폰 추가하기</Link></button>
                    </tr>
                 ))}
            </ul>
            </CommonTable>
        </div>
    );
};
export default GetCoupon;