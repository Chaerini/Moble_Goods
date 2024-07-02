import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommonTable from "../../component/table/CommonTable";
import CommonTableColumn from "../../component/table/CommonTableColumn";
import CommonTableRow from "../../component/table/CommonTableRow";
import "../productManage/styles.css";
import { Link } from 'react-router-dom';
import "../../Context/ProductContext"
const GetUser = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://1ocalhost:8080/api/users`);
                setData(response.data);
            } catch (error) {
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
            <h2>고객</h2>
            <thead>
            <tr>
                <th>이름</th>
                <th>아이디</th>
                <th>주소</th>
                <th>멤버십 아이디</th>
            </tr>
        </thead>
                {data.map((user) => (
                    <CommonTableRow key={user.id}>
                        <CommonTableColumn>{user.name}</CommonTableColumn>
                        <CommonTableColumn>{user.username}</CommonTableColumn>
                        <CommonTableColumn>{user.address}</CommonTableColumn>
                        <CommonTableColumn>{user.memebership_id}</CommonTableColumn>
                        <button className='delete' onClick={()=>handleDelete(user.id)}>삭제</button>
                        <button className='update'><Link to={`/updateuser/${user.id}`}>수정</Link></button>
                    </CommonTableRow>
                 ))}
            </ul>
            </CommonTable>
            
        </div>
    );
};
export default GetUser;