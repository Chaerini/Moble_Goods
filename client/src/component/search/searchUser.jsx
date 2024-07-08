import React, { useEffect,useState,useContext,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./search.css";
import "../../pages/admin/orderManage/orderManage.css";
import {
  faPlus,
  faPen,
  faTrash,
  faMagnifyingGlass,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
const SearchUser = () =>{
    const modalBackground = useRef();
    const handleChange = (e) =>{
        const{name,value}=e.target;
        setMpData((prev) => ({...prev,[name]:value}));
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [mpData,setMpData] = useState({
        userId:"",
        name:"",
        address:"",
        phone:"",
        membership_name:"",

    });
    const [userData, setUserData] = useState([]);
    const [searchWord, setSearchWord] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredData, setFilteredData] = useState(null);
    const [Data, setData] = useState([]);
    const itemsPerPage = 15;
    const { data} = useFetch(`${apiUrl}/users`);
    const orderList = Array.isArray(data) ? data : data?.rows || [];
    const [IsUpDown,setUpDown]= useState(Data)
    
    useEffect(() => {
    const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/users`,);
                console.log("data",response.data.rows);
                setUserData(response.data.rows);
            }catch (error) {
                console.error('Error fetching data', error);
            }
        };
        
        fetchData();
    }, []);
    const handleSearch = async(e) =>{
        console.log("검색어",searchWord)
        e.preventDefault();
        try {
            const res = await axios.get(`http://localhost:8080/api/searchuser?name=${searchWord}`);
            setUserData(res.data.result);
            console.log(res.data.result);
            alert("조회되었습니다.")
        } catch (err) {
            console.log(err);
            alert("일치하는 고객이 없습니다.")
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }
    
    const handleEditClick = async(user) =>{

        console.log("user:",user);
        setMpData({
            userId:user.id,
            name:user.name,
            address:user.address,
            phone:user.phone,
            membership_name:user.membership_name,

          });
        setModalOpen(true);
        console.log(mpData)
    }
    const handleDelete  = async(id) =>{
        try{
            await axios.delete(`http://localhost:8080/api/users/`+id)
            window.location.reload();
            alert("삭제되었습니다.")
        }catch(err){
            console.log(err)
        }
    }
    const handleEditAction = async (userId) =>{
        setModalOpen(false);
        console.log("=======data=====",userId)
        try {
            const res=await axios.put(`http://localhost:8080/api/users/`+userId,mpData, { withCredentials: true });
            alert('회원 정보가 수정되었습니다.');
        } catch (err) {
            alert('회원정보 수정을 실패했습니다. 다시 시도해주세요.')
            console.log(err);
        }
    }
    const handleClick = (pageNumber) => setCurrentPage(pageNumber);
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`orderManage-page-num ${
                currentPage === i ? "active" : ""
              }`}
            >
              {i}
            </button>
          );
        }
        return pageNumbers;
      };
    const dataToDisplay = filteredData || orderList;
    const groupedItems = dataToDisplay.reduce((acc, item) => {
        if (!acc[item.order_id]) acc[item.order_id] = [];
        acc[item.order_id].push(item);
        return acc;
      }, {});
    const groupedOrdersArray = Object.values(groupedItems);
    const totalPages = Math.ceil(groupedOrdersArray.length / itemsPerPage);
    const handleUpDown =(e) =>{
        //옵션을 클릭했을때 옵션의 값을 가져온다.
      const value = e.target.value
    // 최신순 리스트로 정렬 함수(sort)
      const newList = ()=> Data.sort(function(a,b) {
        //기존 할일리스트의 생성일로 비교
        //시간를 new Date()로 감싸줘야한다.
        return new (b.name) - (a.name);
      });
      // 옵션의 값이 '최신순'이면 상태를 '최신순'으로 바꾸고 
     // 각 맞는 정렬함수를 넣어준다.
      if(value === '이름순'){
        setUpDown('이름순')
        return setData(newList())
      }
    }
    return(
        <div className="search-table-container">
                    <div className="search-input-wrap">
                    <h2><FontAwesomeIcon icon={faUser}/>고객</h2>
                    <select
                onClick={handleUpDown} className="select-date">
                    <option>이름순</option>
                </select>
                <input
                type="text"
                placeholder="검색할 사용자 이름을 적어주세요"
                className="search-input"
                onChange={(e) => setSearchWord(e.target.value)}
                onKeyDown={handleKeyPress}
                />
                  <button type="submit" className="search-btn" onClick={handleSearch}>
                    검색
                  </button>
                  </div>
            <div className="orderManage-table-box">
                    <table className="notice-table">
                    <thead className="search-table-head">
                        <tr>
                            <th>이름</th>
                            <th>아이디</th>
                            <th>주소</th>
                            <th>핸드폰</th>
                            <th>멤버십</th>
                            <th>수정</th>
                            <th>삭제</th>
                        </tr>
                        </thead>
                        <tbody className="orderManage-table">
                        {(!userData || userData.length < 0) ? (
                            <tr className="table-content">사용자 정보가 없습니다.</tr>
                        ) : (
                            userData.map((user, index) => (
                                <tr className="product-content" key={index}>
                                    <td className="orderManage-td">{user.name}</td>
                                    <td className="orderManage-td">{user.username}</td>
                                    <td className="orderManage-td">{user.address}</td>
                                    <td className="orderManage-td">{user.phone}</td>
                                    <td className="orderManage-td">{user.membership_name}</td>
                                    <td className="orderManage-td">
                                    <FontAwesomeIcon icon={faPen} onClick={() => handleEditClick(user)}/> 
                                    </td>
                                    <td className="orderMange-td">
                                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} />
                                    </td>
                                </tr>
                            )))}
                             <div className="orderManage-page-btn-box">
              <button
                className="orderManage-page-btn"
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
              >
                이전
              </button>
              {renderPageNumbers()}
              <button
                className="orderManage-page-btn"
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                다음
              </button>
                </div>
                        </tbody>
                    </table>
        {
          modalOpen &&
    <div className={'modal-container'} ref={modalBackground} onClick={e => {
        if(e.target===modalBackground.currnet){
            setModalOpen(false);
        }
    }}>
        <div className='login'>
            <div className="search-container">
                <label>고객정보 수정하기</label>
                <input type="hidden"  name="id"  className="product-input" value={mpData.userId}/>
                <input type="text" onChange={handleChange} name="name" placeholder="이름" className="product-input" value={mpData.name}/>
                <input type="text" onChange={handleChange} name="address" placeholder="주소" className="product-input" value={mpData.address}/>
                <input type="text" onChange={handleChange} name="phone" placeholder="핸드폰" className="product-input" value={mpData.phone}/>
                <button onClick={()=>handleEditAction(mpData.userId)} className="btn">수정</button>
            </div>
        </div>
    </div>
        }
                </div>
            </div>
    )
}
export default SearchUser;