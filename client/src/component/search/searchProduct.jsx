import {
  faHouse,
  faBook,
  faUser,
  faX,
  faPen,
  faTrash,
  faPlus,
  faBoxOpen,
  faL
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./search.css";

const Search = () => {
  const [Data, setData] = useState([]);
  const [searchWord, setSearchWord] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [mpData, setMpData] = useState({
      userId: "",
      name: "",
      quantity: "",
      price: "",
      discount_rate: "",
      discounted_price: "",
      date: "",
      subCategoryId:""
  });
  const [product,setProduct] = useState({
    name:"",
    price:"",
    quantity:"",
    discount_rate:"",
    discounted_price:"",
});
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [IsUpDown, setUpDown] = useState(Data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modalIsOpen,setModalIsOpen]=useState(false);
  // 데이터 가져오기
  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get(`${apiUrl}/products`);
              console.log("data", response.data);
              setData(response.data);
          } catch (error) {
              console.error('데이터 가져오기 오류', error);
          }
      };

      fetchData();
  }, []);

  // 검색 버튼 클릭 시
  const handleSearch = async (e) => {
      // e.preventDefault();
      try {
          const res = await axios.get(`${apiUrl}/search?name=${searchWord}`);
          setData(res.data.result);
          console.log(res.data.result);
          alert("조회되었습니다.");
      } catch (err) {
          console.log(err);
          alert("일치하는 상품이 없습니다.");
      }
  }

  const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
          handleSearch(e);
      }
  }

  const handleDelete = async (id,e) => {
      try {
          const res = await axios.delete(`${apiUrl}/products/` + id)
          alert("삭제되었습니다.");
      } catch (err) {
          console.log(err)
      }
  }

  const handleEditClick = async (user) => {
      console.log("product", user);
      setMpData({
          userId: user.id,
          name: user.name,
          quantity: user.quantity,
          price: user.price,
          discount_rate: user.discount_rate,
          discounted_price: user.discounted_price,
          date: user.date,
          subCategoryId:user.subCategoryId        
        });
      setModalOpen(true);
      console.log(mpData)
  }
  const handleChange = (e) => {
      const { name, value } = e.target;
      setMpData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditAction = async (userId) => {
      setModalOpen(false);
      console.log("=======data=====", userId)
      try {
          const res = await axios.put(`${apiUrl}/products/` + userId, mpData, { withCredentials: true });
          alert('상품 정보가 수정되었습니다.');
      } catch (err) {
          alert('상품 정보 수정을 실패했습니다. 다시 시도해주세요.')
          console.log(err);
      }
  }

  const handleUpDown = (e) => {
      const value = e.target.value;
      const newList = () => Data.sort((a, b) => new Date(b.date) - new Date(a.date));
      const oldList = () => Data.sort((a, b) => new Date(a.date) - new Date(b.date));
      const priceList = () => Data.sort((a, b) => b.price - a.price);
      if (value === '최신순') {
          setUpDown('최신순')
          return setData(newList())
      } else if (value === '등록순') {
          setUpDown('등록순')
          return setData(oldList())
      } else if (value === "가격순") {
          setUpDown("가격순")
          return setData(priceList())
      }
  }

  const { data, loading, error } = useFetch(`${apiUrl}/products`);
  const orderList = Array.isArray(data) ? data : data?.rows || [];
  if (!Array.isArray(orderList))
      return <div>예상치 못한 데이터 형식입니다</div>
  const dataToDisplay = Data || orderList;

  const totalPages = Math.ceil(dataToDisplay.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataToDisplay.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(
              <button
                  key={i}
                  onClick={() => handleClick(i)}
                  className={`orderManage-page-num ${currentPage === i ? "active" : ""}`}
              >
                  {i}
              </button>
          );
      }
      return pageNumbers;
  };
const handleAddChange = (e) =>{
    setProduct((prev) => ({...prev,[e.target.name]:e.target.value}));
};
console.log(product)
const handleAddClick = async e =>{
    try{
        await axios.post(`${apiUrl}/products`,product);
        alert("상품이 추가되었습니다.")
        setModalIsOpen(false);
    }catch(err){
        console.log(err);
        alert("상품 추가에 실패했습니다.")
    }
}
const handleAddAction = () =>{
    setModalIsOpen(true);

};


  return (
      <div className="search-table-container">
          <div className="search-input-wrap">
              <h2><FontAwesomeIcon icon={faBoxOpen} />상품</h2>
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
          <div className="orderManage-table-box">
              <table className="notice-table">
                  <thead className="search-table-head">
                      <tr>
                          <th>이름</th>
                          <th>수량</th>
                          <th>할인율</th>
                          <th>할인된 가격</th>
                          <th>날짜</th>
                          <th>수정</th>
                          <th>삭제</th>
                          <th>추가</th>
                      </tr>
                  </thead>
                  <tbody className="orderManage-table">
                      {(!currentItems || currentItems.length < 0) ? (
                          <tr className="table-content">사용자 정보가 없습니다.</tr>
                      ) : (
                          currentItems.map((user, index) => (
                              <tr className="product-content" key={index}>
                                  <td className="orderMange-td">{user.name}</td>
                                  <td className="orderMange-td">{user.quantity}</td>
                                  <td className="orderMange-td">{user.discount_rate}</td>
                                  <td className="orderMange-td">{user.discounted_price}</td>
                                  <td className="orderMange-td">{user.date}</td>
                                  <td className="orderMange-td">
                                      <FontAwesomeIcon icon={faPen} onClick={() => handleEditClick(user)} />
                                  </td>
                                  <td className="orderMange-td">
                                      <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} />
                                  </td>
                                  <td>
                                  <FontAwesomeIcon icon={faPlus} onClick={() =>handleAddAction(user)} />
                                  </td>
                              </tr>
                          )))}
                  </tbody>
              </table>
              </div>
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
          {modalOpen &&
              <div className='modal-container' ref={modalBackground} onClick={e => {
                  if (e.target === modalBackground.currnet) {
                      setModalOpen(false);
                  }
              }}>
                  <div className="login">
                      <div className="search-container">
                          <label>상품정보 수정하기</label>
                          <input type="hidden" name="id" className="product-input" value={mpData.userId} />
                          <input type="text" onChange={handleChange} name="name" className="product-input" value={mpData.name} />
                          <input type="text" onChange={handleChange} name="quantity" className="product-input" value={mpData.quantity} />
                          <input type="text" onChange={handleChange} name="price" placeholder="가격" className="product-input" value={mpData.price} />
                          <input type="text" onChange={handleChange} name="discount_rate" placeholder="할인율" className="product-input" value={mpData.discount_rate} />
                          <input type="text" onChange={handleChange} name="discounted_price" placeholder="할인된 가격" className="product-input" value={mpData.discounted_price} />
                          <input type="text" onChange={handleChange} name="date" placeholder="날짜" className="product-input" value={mpData.date} />
                          <input type="text" onChange={handleChange} name="subcategory_id" placeholder="중분류" className="product-input" value={mpData.subCategoryId}/>
                          <button onClick={() => handleEditAction(mpData.userId)} className="btn">수정</button>
                      </div>
                  </div>
              </div>
          }
          {modalIsOpen &&
              <div className='modal-container' ref={modalBackground} onClick={e => {
                  if (e.target === modalBackground.currnet) {
                      setModalOpen(false);
                  }
              }}>
                  <div className="login">
                      <div className="search-container">
                          <label>상품정보 추가하기</label>
                          <input type="hidden" name="id" className="product-input" value={mpData.userId} />
                          <input type="text" onChange={handleAddChange} name="name" className="product-input" placeholder="이름" />
                          <input type="text" onChange={handleAddChange} name="quantity" className="product-input"placeholder="수량" />
                          <input type="text" onChange={handleAddChange} name="price" placeholder="가격" className="product-input" />
                          <input type="text" onChange={handleAddChange} name="discount_rate" placeholder="할인율" className="product-input" />
                          <input type="text" onChange={handleAddChange} name="discounted_price" placeholder="할인된 가격" className="product-input" />
                          <input type="text" onChange={handleAddChange} name="date" placeholder="날짜" className="product-input"  />
                          <button onClick={handleAddClick} className="btn">추가</button>
                      </div>
                  </div>
              </div>
          }
      </div>
  );
};

export default Search;
