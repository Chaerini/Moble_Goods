import React, { useState, useEffect } from 'react';
import './NoticeList.css';
import axios from 'axios';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('API_ENDPOINT'); // 실제 API 엔드포인트로 대체
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = notices.slice(indexOfFirstNotice, indexOfLastNotice);

  const totalPages = Math.ceil(notices.length / noticesPerPage);

  return (
    <div className="notice-list-container">
      <h2 className="notice-list-title">공지사항</h2>
      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
          </tr>
        </thead>
        <tbody>
          {currentNotices.map((notice, index) => (
            <tr key={notice.id}>
              <td>{notices.length - (currentPage - 1) * noticesPerPage - index}</td>
              <td>{notice.title}</td>
              <td>{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoticeList;
