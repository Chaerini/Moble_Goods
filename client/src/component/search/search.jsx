import {
    faHouse,
    faBook,
    faUser,
    faX,
    faPen,
    faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [userData, setUserData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectUserId, setSelectUserId] = useState();
    const [searchWord, setSearchWord] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    // 사용자 정보가 업데이트 됐을 경우 렌더링
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${apiUrl}/products`, { withCredentials: true });

                setUserData(res.data.rows);
                console.log(res.data.rows);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [openModal, searchWord]);

    // 검색 버튼 클릭 했을 때
    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(searchWord)
        try {
            const res = await axios.get(`${apiUrl}/search/name?name=${searchWord}`);
            setUserData(res.data.rows);
            console.log(res.data.rows);
        } catch (err) {
            console.log(err);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }
    return (
        <div className="admin">
            <div className="admin-center">
                <div className="admin-center-top"><FontAwesomeIcon icon={faX} className="admin-exit-icon" onClick={() => navigate('/')}/></div>

                <div className="admin-search-bg">
                    <div className="admin-search-input">
                        <input type="text" placeholder="검색할 사용자 이름을 적어주세요" className="admin-input" onChange={(e) => setSearchWord(e.target.value)} onKeyDown={handleKeyPress}></input>
                        <button className='admin-input-button' onClick={handleSearch}>검색</button>
                    </div>
                </div>

                <div className="admin-container">
                    <div className="admin-info-bg">

                        <table className="admin-table">
                            <colgroup>
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '20%' }} />
                                <col style={{ width: '30%' }} />
                                <col style={{ width: '10%' }} />
                                <col style={{ width: '5%' }} />
                                <col style={{ width: '5%' }} />
                            </colgroup>
                            <tr className="table-title">
                                <th className="table-title-th">아이디</th>
                                <th>이름</th>
                                <th>전화번호</th>
                                <th>관리자여부</th>
                                <th></th>
                                <th></th>
                            </tr>


                            {(!userData || userData.length < 0) ? (
                                <tr className="table-content"><td colSpan="6">사용자 정보가 없습니다.</td></tr>
                            ) : (
                                userData.map((user, index) => (
                                    <tr className="table-content" key={index}>
                                        <td className="content-title">{user.username}</td>
                                        <td>{user.name}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                    </tr>
                                )))}

                        </table>


                    </div>
                </div>

            </div>
        </div >
    );
};

export default Search;