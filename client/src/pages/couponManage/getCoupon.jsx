import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { Link,useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faPen,
    faPlus
  } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from '../admin/adminHeader/AdminHeader';
import AdminSidebar from '../admin/adminSidebar/AdminSidebar';
import Search from '../../component/search/search';
const GetCoupon = () => {
    const navigate=useNavigate();
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
        <div>
        <AdminHeader/>
        <AdminSidebar/>
        <div className="product-container">
            <Search />
            <FontAwesomeIcon icon={faPlus} onClick={() => navigate("/addcoupon")} />
            <h2 className='notice'>쿠폰</h2>
            <table className='notice-table'>
                <thead>
                <tr>
                    <th className='th'>이름</th>
                    <th className='th'>할인가격</th>
                    <th className='th'>시작일</th>
                    <th className='th'>만료일</th>
                    <th className='th'>조건</th>
                    <th className='th'>삭제/수정</th>
                </tr>
                </thead>
                <tbody>
                {coupon.map((coupon) => (
                    <tr key={coupon.id} className='tr'>
                        <th className='th'>{coupon.name}</th>
                        <th className='th'>{coupon.discount}</th>
                        <th className='th'>{coupon.start_date}</th>
                        <th className='th'>{coupon.end_date}</th>
                        <th className='th'>{coupon.conditions}</th>
                            <td className='td'>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(coupon.id)} />
                                <FontAwesomeIcon icon={faPen} onClick={() => navigate(`/updatecoupon/${coupon.id}`)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};
export default GetCoupon;