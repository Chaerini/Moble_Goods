import {
    faHouse,
    faBook,
    faUser,
    faX,
    faPen,
    faTrash,
    faPlus,
    faBoxOpen,
    faClipboardList
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "../../component/search/search.css";
import "./AdminNotice.css";
const UserNotice = () => {
    const [Data, setData] = useState([]);
    const [searchWord, setSearchWord] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [mpData,setMpData] = useState({
        userId:"",
        title:"",
        content:""

    });
    const [IsUpDown,setUpDown]= useState(Data)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const [filteredData, setFilteredData] = useState(null);
    const [selectedOrderData, setSelectedOrderData] = useState(null);
    const [notice, setNotice] = useState({
      title: "",
      content: "",
      userId: "",
      date:""
    });
    // 사용자 정보가 업데이트 됐을 경우 렌더링
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/notice`);
                console.log("data",response.data.rows);
                setData(response.data.rows);
            }catch (error) {
                console.error('Error fetching data', error);
            }
        };
        
        fetchData();
    }, []);
    // 검색 버튼 클릭 했을 때
    const handleSearch = async (e) => {
        // e.preventDefault();
        console.log("검색어",searchWord);
        try {
            const res = await axios.get(`${apiUrl}/searchnotice?title=${searchWord}`);
            setData(res.data.rows);
            console.log(res.data.rows);
            alert("조회되었습니다.")
        } catch (err) {
            console.log(err);
            alert("일치하는 공지가 없습니다.")
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }
    const handleDelete  = async(id) =>{
        try{
            const res= await axios.delete(`${apiUrl}/notice/`+id);
            alert("삭제되었습니다.");
        }catch(err){
            console.log(err)
        }
    }
    const handleChange = (e) =>{
        const{name,value}=e.target;
        setMpData((prev) => ({...prev,[name]:value}));
    };
    //주문 
    const { data, loading, error } = useFetch(`${apiUrl}/notices`);
    const orderList = Array.isArray(data) ? data : data?.rows || [];
    if (!Array.isArray(orderList))
      return <div>예상치 못한 데이터 형식입니다</div>
    const dataToDisplay = filteredData || orderList;

    const uniqueOrderCount = new Set(dataToDisplay.map((item) => item.order_id))
      .size;
  
    const groupedItems = dataToDisplay.reduce((acc, item) => {
        if (!acc[item.order_id]) acc[item.order_id] = [];
        acc[item.order_id].push(item);
        return acc;
      }, {});
    const groupedOrdersArray = Object.values(groupedItems);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = groupedOrdersArray.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    const totalPages = Math.ceil(groupedOrdersArray.length / itemsPerPage);
  
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
    const handleAddChange = (e) => {
      setNotice((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    console.log(notice);
    const handleAddClick = async (e) => {
      try {
        await axios.post(`${apiUrl}/notice`, notice);
        alert("공지가 추가되었습니다.")
      } catch (err) {
        console.log(err);
        alert("공지 추가에 실패했습니다.")
      }
    };
return (
    <div className="container">
        <div className="search-input-wrap">
            <h2><FontAwesomeIcon icon={faClipboardList}/>공지</h2>
        </div>
                    <div className="notice-table-box">
                        <table className="notice-table">
                            <thead className="search-table-head">
                            <tr>
                            <th >제목</th>
                            <th >내용</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(!Data || Data.length < 0) ? (
                                <tr className="table-content">사용자 정보가 없습니다.</tr>
                            ) : (
                                Data.map((user, index) => (
                                    <tr className key={index}>
                                        <td className="orderMange-td">{user.title}</td>
                                        <td className="orderMange-td">{user.content}</td>                            
                                        </tr>
                            )))}
                             
            </tbody>
        </table>
        </div>
    </div>                     
    );
};
export default UserNotice;