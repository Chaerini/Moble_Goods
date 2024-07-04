import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CommonTable from "../productManage/CommonTable";
import "../productManage/product.css";
import { Link } from 'react-router-dom';
import "../../Context/ProductContext"
import { AuthContext } from '../../Context/AuthContext';
import AdminHeader from "../admin/adminHeader/AdminHeader";
import AdminSidebar from "../admin/adminSidebar/AdminSidebar";
import Search from "../../component/search/search";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
const GetUser = () => {
    const navigate=useNavigate();
    const [user,setUser]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users`,);
                console.log("data",response.data.rows);
                setUser(response.data.rows);
            }catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    const handleDelete  = async(id) =>{
        try{
            await axios.delete(`http://localhost:8080/api/users/`+id)
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
            <h2 className='notice'>회원</h2>
            <table className='notice-table'>
                <thead>
                    <tr>
                        <th className='th'>이름</th>
                        <th className='th'>아이디</th>
                        <th className='th'>주소</th>
                        <th className='th'>핸드폰</th>
                        <th className='th'>멤버십</th>
                        <th className='th'>삭제/수정</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((user) => (
                        <tr key={user.id} className='tr'>
                            <td className='td'>{user.name}</td>
                            <td className='td'>{user.username}</td>
                            <td className='td'>{user.address}</td>
                            <td className='td'>{user.phone}</td>
                            <td className='td'>{user.membership_name}</td>
                            <td className='td'>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} />
                                <FontAwesomeIcon icon={faPen} onClick={() => navigate(`/updateuser/${user.id}`)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};
export default GetUser;