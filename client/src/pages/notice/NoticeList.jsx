import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommonTable from "../../component/table/CommonTable";
import CommonTableColumn from "../../component/table/CommonTableColumn";
import CommonTableRow from "../../component/table/CommonTableRow";
import "../productManage/styles.css";
import { Link } from 'react-router-dom';
const NOticeList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL;
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/notice`);
                setData(response.data);
                console.log(apiUrl);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="CommonTable">
        <CommonTable headersName={[]}>
        <ul>
            <h2>공지사항</h2>
            <thead>
            <tr>
                <th>제목</th>
                <th>내용</th>
            </tr>
        </thead>
                {data.map((notice) => (
                    <CommonTableRow key={notice.id}>
                        <CommonTableColumn>{notice.id}</CommonTableColumn>
                        <CommonTableColumn>{notice.title}</CommonTableColumn>
                        <CommonTableColumn>{notice.content}</CommonTableColumn>
                        <button className='update'><Link to={`/updateproduct/${notice.id}`}>수정</Link></button>
                    </CommonTableRow>
                 ))}
            </ul>
            </CommonTable>
        </div>
    );
};
export default NOticeList;