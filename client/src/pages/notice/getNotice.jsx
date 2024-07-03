import React, { useEffect, useState,useContext} from 'react';
import axios from 'axios';
import CommonTable from "../productManage/CommonTable";
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import "../productManage/product.css";
const GetNotice = () => {
     
    const [notice,setNotice]=useState([]);
    const {user}=useContext(AuthContext)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/notice`);  
                console.log("response.data.rows : ",response.data.rows)
                setNotice(response.data.rows);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    const handleDelete  = async(id) =>{
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
            <h2 className='product'>공지</h2>
            <thead>
            <tr className='tr'>
                <th className='th'>제목</th>
                <th className='th'>내용</th>
            </tr>
        </thead>
                {notice.map((notice) => (                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                    <tr key={notice.id} className='tr'>
                        <th className='th'>{notice.title}</th>
                        <th className='th'>{notice.content}</th>
                        <button className='btn' onClick={handleDelete}>삭제</button>
                        <button className='btn'><Link to={`/updatenotice/${notice.id}`}>수정</Link></button>
                    </tr>
                 ))}
            </ul>
            </CommonTable>
        </div>
    );
};
export default GetNotice