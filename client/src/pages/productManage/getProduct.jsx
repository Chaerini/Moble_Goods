import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Search from '../../component/search/search';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./Notice.css";
import AdminSidebar from '../admin/adminSidebar/AdminSidebar';
import AdminHeader from '../admin/adminHeader/AdminHeader';
const GetProduct = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, [user.token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            setData(data.filter(product => product.id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
        <AdminHeader/>
        <AdminSidebar/>
        <div className="product-container">
            <Search />
            <FontAwesomeIcon icon={faPlus} onClick={() => navigate("/addproduct")} />
            <h2 className='notice'>상품</h2>
            <table className='notice-table'>
                <thead>
                    <tr>
                        <th className='th'>이름</th>
                        <th className='th'>수량</th>
                        <th className='th'>가격</th>
                        <th className='th'>할인율</th>
                        <th className='th'>할인된 가격</th>
                        <th className='th'>날짜</th>
                        <th className='th'>액션</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => (
                        <tr key={product.id} className='tr'>
                            <td className='td'>{product.name}</td>
                            <td className='td'>{product.quantity}</td>
                            <td className='td'>{product.price}</td>
                            <td className='td'>{product.discount_rate}</td>
                            <td className='td'>{product.discounted_price}</td>
                            <td className='td'>{product.date}</td>
                            <td className='td'>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(product.id)} />
                                <FontAwesomeIcon icon={faPen} onClick={() => navigate(`/updateproduct/${product.id}`)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="btn-group">
                <button onClick={() => {
                    const sortedData = [...data].sort((a, b) => b.price - a.price);
                    setData(sortedData);
                }} className='btn'>가격순 정렬</button>
                <button onClick={() => {
                    const sortedData = [...data].sort((a, b) => b.name.localeCompare(a.name));
                    setData(sortedData);
                }} className='btn'>이름순 정렬</button>
            </div>
        </div>
    </div>
    );
};
export default GetProduct;
