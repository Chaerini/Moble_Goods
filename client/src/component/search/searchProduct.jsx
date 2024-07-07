import {
    faHouse,
    faBook,
    faUser,
    faX,
    faPen,
    faTrash,
    faPlus,
    faBoxOpen
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./search.css";
const Search = () => {
    const [Data, setData] = useState([]);
    const [searchWord, setSearchWord] = useState();
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [mpData,setMpData] = useState({
        userId:"",
        name:"",
        quantity:"",
        price:"",
        discount_rate:"",
        discounted_price:"",
        date:""

    });
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();
    const [IsUpDown,setUpDown]= useState(Data)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const [filteredData, setFilteredData] = useState(null);
    // 사용자 정보가 업데이트 됐을 경우 렌더링
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/products`);
                console.log("data",response.data);
                setData(response.data);
            }catch (error) {
                console.error('Error fetching data', error);
            }
        };
        
        fetchData();
    }, []);
    // 검색 버튼 클릭 했을 때
    const handleSearch = async (e) => {
        // e.preventDefault();
        try {
            const res = await axios.get(`${apiUrl}/search?name=${searchWord}`);
            setData(res.data.result);
            console.log(res.data.result);
            alert("조회되었습니다.")
        } catch (err) {
            console.log(err);
            alert("일치하는 상품이 없습니다.")
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    }
    const handleDelete  = async(id) =>{
        try{
            const res= await axios.delete(`${apiUrl}/products/`+id)
        }catch(err){
            console.log(err)
        }
    }
    const handleEditClick = async(user) =>{

        console.log("product",user);
        setMpData({
            userId:user.id,
            name: user.name,
            quantity:user.quantity,
            price:user.price,
            discount_rate:user.discount_rate,
            discounted_price:user.discounted_price,
            date:user.date
          });
        setModalOpen(true);
        console.log(mpData)
    }
    const handleChange = (e) =>{
        const{name,value}=e.target;
        setMpData((prev) => ({...prev,[name]:value}));
    };
    const handleEditAction = async (userId) =>{
        setModalOpen(false);
        console.log("=======data=====",userId)
        try {
            const res=await axios.put(`${apiUrl}/products/`+userId,mpData, { withCredentials: true });
            alert('상품 정보가 수정되었습니다.');
        } catch (err) {
            alert('상품정보 수정을 실패했습니다. 다시 시도해주세요.')
            console.log(err);
        }
    }
    const handleUpDown =(e) =>{
        //옵션을 클릭했을때 옵션의 값을 가져온다.
      const value = e.target.value
    // 최신순 리스트로 정렬 함수(sort)
      const newList = ()=> Data.sort(function(a,b) {
        //기존 할일리스트의 생성일로 비교
        //시간를 new Date()로 감싸줘야한다.
        return new Date (b.date) - new Date (a.date);
      });
    // 등록순 리스트로 정렬 함수
      const oldList = () =>Data.sort(function(a,b) {
        return new Date(a.date) - new Date(b.date)
      });
      const priceList = () =>Data.sort(function(a,b){
        return b.price-a.price;
      });
      // 옵션의 값이 '최신순'이면 상태를 '최신순'으로 바꾸고 
     // 각 맞는 정렬함수를 넣어준다.
      if(value === '최신순'){
        setUpDown('최신순')
        return setData(newList())
      }else if(value === '등록순'){
        setUpDown('등록순')
        return setData(oldList())
      }else if(value=="가격순"){
        setUpDown("가격순")
        return setData(priceList())
      }
    }
    //주문 
    const { data, loading, error } = useFetch(`${apiUrl}/products`);
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
    return (
        <div className="orderMange-wrapper">
            <div className="search-input-wrap">
            <h2><FontAwesomeIcon icon={faBoxOpen}/>상품</h2>
                <select
                onClick={handleUpDown} className="select-date">
                    <option>최신순</option>
                    <option>등록순</option>
                    <option>가격순</option>
                </select>
                <input
                type="text"
                className="search-input"
                placeholder="검색할 상품을 입력하세요"
                onChange={(e) => setSearchWord(e.target.value)}
                onKeyDown={handleKeyPress}
                />
  <button type="submit" className="search-btn" onClick={handleSearch}>검색</button> 
            </div>
            <div className="order-content-wrapper">
                </div>
                <div>
                </div>
                    <div className="orderManage-table-box">
                    <FontAwesomeIcon icon={faPlus} onClick={()=>navigate("/addproduct")}/>
                        <table className="orderManage-table">
                            <thead className="search-table-head">
                            <tr>
                            <th className="orderManage-th">이름</th>
                            <th className="orderManage-th">수량</th>
                            <th className="orderManage-th">할인율</th>
                            <th className="orderManage-th">할인된 가격</th>
                            <th className="orderManage-th">날짜</th>
                            <th className="orderManage-th">수정</th>
                            <th className="orderManage-th">삭제</th>
                            </tr>
                            </thead>
                            <tbody className="orderManage-table-body">
                            {(!Data || Data.length < 0) ? (
                                <tr className="table-content">사용자 정보가 없습니다.</tr>
                            ) : (
                                Data.map((user, index) => (
                                    <tr className="product-content" key={index}>
                                        <td className="orderMange-td">{user.name}</td>
                                        <td className="orderMange-td">{user.quantity}</td>
                                        <td className="orderMange-td">{user.discount_rate}</td>
                                        <td className="orderMange-td">{user.discounted_price}</td>
                                        <td className="orderMange-td">{user.date}</td>
                                        <td className="orderMange-td">
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
        {modalOpen &&
    <div className='modal-container' ref={modalBackground} onClick={e => {
        if(e.target===modalBackground.currnet){
            setModalOpen(false);
        }
    }}>
            <div className="login">
                <div className="login-container">
                <label>상품정보 수정하기</label>
                <input type="hidden"  name="id"  className="product-input" value={mpData.userId}/>
                <input type="text" onChange={handleChange} name="name" className="product-input"  value={mpData.name}/>
                <input type="text" onChange={handleChange} name="quantity"className="product-input" value={mpData.quantity}/>
                <input type="text" onChange={handleChange} name="price" placeholder="가격" className="product-input" value={mpData.price}/>
                <input type="text" onChange={handleChange} name="discount_rate" placeholder="할인율" className="product-input" value={mpData.discount_rate}/>
                <input type="text" onChange={handleChange} name="discounted_price" placeholder="할인된 가격" className="product-input" value={mpData.discounted_price}/>
                <input type="text" onChange={handleChange} name="date" placeholder="날짜" className="product-input" value={mpData.date}/>
                <button onClick={()=>handleEditAction(mpData.userId)} className="btn">수정</button>
                </div>
            </div>
        </div>
        }
                    </div>
                </div>                     
    );
};
export default Search;