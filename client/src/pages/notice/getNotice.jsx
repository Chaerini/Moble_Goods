import React, { useEffect, useState,useContext} from 'react';
import axios from 'axios';
import CommonTable from "../productManage/CommonTable";
import CommonTableColumn from "../productManage/CommonTableColumn";
import CommonTableRow from "../productManage/CommonTableRow";
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
const GetNotice = () => {
    const [data, setData] = useState([]);
    const {user}=useContext(AuthContext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/notice`,{
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                      },
                });
                setData(response.data);
                console.log("data",data);
                console.log("token",user.token)
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, []);
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
                    <div>
                        <>{notice.id}</>
                        <>{notice.title}</>
                        <>{notice.content}</>
                        <button className='update'><Link to={`/updatenotice/${notice.id}`}>수정</Link></button>
                        </div>
                 ))}
            </ul>
            </table>
        </div>
    );
};
export default GetNotice