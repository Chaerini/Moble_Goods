import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommonTable from "../../component/table/CommonTable";
import CommonTableColumn from "../../component/table/CommonTableColumn";
import CommonTableRow from "../../component/table/CommonTableRow";
import "../productManage/styles.css";
import { Link } from 'react-router-dom';
const GetNotice = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/notice`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    const handleDelete  = async(id) =>{
        try{
            await axios.delete(`http://localhost:8080/api/notice/`+id)
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    };
    return (
        <div className="CommonTable">
        <table headersName={[]}>
        <ul>
            <h2>공지사항</h2>
            <thead>
            <tr>
                <th>제목</th>
                <th>내용</th>
            </tr>
        </thead>
                {data.map((notice) => (
                    <div key={notice.id}>
                        <>{notice.id}</>
                        <>{notice.title}</>
                        <>{notice.content}</>
                        <button className='delete' onClick={()=>handleDelete(notice.id)}>삭제</button>
                        <button className='update'><Link to={`/updatenotice/${notice.id}`}>수정</Link></button>
                    </div>
                 ))}
            </ul>
            </table>
        </div>
    );
};
export default GetNotice;