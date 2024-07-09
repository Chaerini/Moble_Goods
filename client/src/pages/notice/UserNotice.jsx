import React, { useEffect, useState } from "react"; // React와 필요한 훅들을 가져옴
import axios from "axios"; // Axios를 가져옴
import Navbar from '../../component/navbar/navbar.jsx';
import Header from '../../component/header/header.jsx';
import Footer from '../../component/footer/footer.jsx';
import './usernotice.css';

const UserNotice = () => {
  const [Data, setData] = useState([]); // 공지사항 데이터를 저장할 상태
  const [selectedOrderData, setSelectedOrderData] = useState(null); // 선택된 공지사항 데이터를 저장할 상태
  const apiUrl = process.env.REACT_APP_API_URL; // API URL 환경 변수

  // 컴포넌트가 처음 렌더링 될 때 공지사항 데이터를 가져옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/notice`); // 공지사항 데이터를 API로부터 가져옴
        setData(response.data.rows); // 가져온 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching data', error); // 오류 발생 시 콘솔에 출력
      }
    };
    fetchData();
  }, []); // 빈 배열을 의존성으로 사용하여 컴포넌트가 처음 렌더링될 때 한 번만 실행됨

  // 공지사항을 클릭했을 때 내용 표시/숨김 토글
  const handleToggleContent = (index) => {
    setSelectedOrderData(selectedOrderData === index ? null : index); // 선택된 인덱스와 같으면 null로, 다르면 해당 인덱스로 설정하여 토글 기능 구현
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="notice-container"> {/* 컨테이너 div */}
        <div className="notice-header"> {/* 공지사항 제목 래퍼 */}
          <h1 className="notice-title">공지사항</h1>
        </div>
        <hr className="notice-title-underline" /> {/* 공지사항 제목과 내용 사이의 검정 실선 */}
        <div className="notice-table-box"> {/* 공지사항 테이블 박스 */}
          <table className="notice-table"> {/* 공지사항 테이블 */}
            <thead className="notice-table-head"> {/* 테이블 헤더 */}
              <tr>
                <th>번호</th> {/* 번호 헤더 */}
                <th>제목</th> {/* 제목 헤더 */}
              </tr>
            </thead>
            <tbody>
              {(!Data || Data.length < 1) ? ( /* 데이터가 없을 때 표시할 내용 */
                <tr className="notice-table-content">
                  <td colSpan="2">사용자 정보가 없습니다.</td> {/* "작성일" 열이 없어져서 colSpan을 2로 변경 */}
                </tr>
              ) : (
                Data.map((user, index) => (
                  <React.Fragment key={index}>
                    <tr className="notice-tr" onClick={() => handleToggleContent(index)}> {/* 각 공지사항 행 */}
                      <td className="notice-orderMange-td-num">{Data.length - index}</td> {/* 번호 */}
                      <td className="notice-orderMange-td">[안내] {user.title}</td> {/* 제목 */}
                    </tr>
                    {selectedOrderData === index && ( /* 선택된 공지사항의 내용 표시 */
                      <tr className="notice-a" key={`${index}-content`}>
                        <td></td>
                        <td className="notice-content"> {/* "작성일" 열이 없어져서 colSpan을 2로 변경 */}
                          <div>
                            {user.content} {/* 공지사항 내용 */}
                            <hr className="notice-content-underline" /> {/* 내용 하단의 실선 */}
                          </div>
                        </td>
                      </tr>
                    )}
                    <tr key={`${index}-underline`}>
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default UserNotice;
