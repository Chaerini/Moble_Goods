import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CommonTable from "../productManage/CommonTable";
import CommonTableColumn from "../productManage/CommonTableColumn";
import CommonTableRow from "../productManage/CommonTableRow";
import "../productManage/product.css";
import { Link } from 'react-router-dom';
import "../../Context/ProductContext"
import { AuthContext } from '../../Context/AuthContext';
const GetUser = () => {
    const [data, setData] = useState([]);
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
        <div className="CommonTable">
        <CommonTable headersName={[]}>
        <ul>
            <thead>
                <th>고객</th>
            <tr>
                <th className="th">이름</th>
                <th className="th">아이디</th>
                <th className="th">주소</th>
                <th className="th">핸드폰</th>
                <th className="th">멤버십 아이디</th>
            </tr>
        </thead>
                {user.map((user) => (
                    <tr key={user.id} className='tr'>
                        <th className='th'>{user.name}</th>
                        <th className='th'>{user.username}</th>
                        <th className='th'>{user.address}</th>
                        <th className="th">{user.phone}</th>
                        <th className='th'>{user.memebership_id}</th>
                        <button className='btn' onClick={()=>handleDelete(user.id)}>삭제</button>
                        <button className='btn'><Link to={`/updateuser/${user.id}`}>수정</Link></button>
                        <button className="btn"><Link to={`/updateusermember/${user.id}`}>멤버십 수정</Link></button>
                    </tr>
                 ))}
            </ul>
            </CommonTable>
            
        </div>
    );
};
export default GetUser;