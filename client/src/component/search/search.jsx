import React, { useEffect,useState,useContext,useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import {
  faPlus,
  faPen,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
const Search = () => {
  const [userData, setUserData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectUserId, setSelectUserId] = useState();
  const [searchWord, setSearchWord] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const modalBackground = useRef();
  const [mpData,setMpData]=useState({
    name:"",
    quantity:"",
    price:"",
    discount_rate:"",
    discounted_price:"",
    date:""
    })
  const location = useLocation();

  // 사용자 정보가 업데이트 됐을 경우 렌더링
 // 검색 버튼 클릭 했을 때
  const handleSearch = async (e) => {
    console.log("검색어",searchWord)
      e.preventDefault();
      try {
          const res = await axios.get(`http://localhost:8080/api/search/name?name=${searchWord}`);
          setUserData(res.data.result);
          console.log(res.data.result);
      } catch (err) {
          console.log(err);
      }
  }
  const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
          handleSearch(e);
      }
  }
  const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        setData(data.filter(product => product.id !== id));
    } catch (err) {
        console.log(err);
    }
}
const  userId = location.pathname.split("/")[2]
const handleChange = (e) =>{
    const{name,value}=e.target;
    setMpData((prev) => ({...prev,[name]:value}));
};
const handleClick = async (e) =>{
  setModalOpen(false);
  try {
      const res = await axios.put(`http://localhost:8080/api/users/`+user.id, mpData, { withCredentials: true });
      alert('회원 정보가 수정되었습니다.');
  } catch (err) {
      alert('회원정보 수정을 실패했습니다. 다시 시도해주세요.')
      console.log(err);
  }
}
  return (
    <div>
          <div className="product-container">
                <Search />
                <FontAwesomeIcon icon={faPlus} onClick={() => navigate("/addproduct")} />
                <h2 className='notice'>상품</h2>
                <table className='notice-table'>
                    <thead>
                        <tr>
                            <th className='th'>이름</th>
                            <th className='th'>수량</th>
                            <th className='th'>가격</th>
                            <th className='th'>할인율</th>
                            <th className='th'>할인된 가격</th>
                            <th className='th'>날짜</th>
                            <th className='th'>액션</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product) => (
                            <tr key={product.id} className='tr'>
                                <td className='td'>{product.name}</td>
                                <td className='td'>{product.quantity}</td>
                                <td className='td'>{product.price}</td>
                                <td className='td'>{product.discount_rate}</td>
                                <td className='td'>{product.discounted_price}</td>
                                <td className='td'>{product.date}</td>
                                <td className='td'>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(product.id)} />
                                    <FontAwesomeIcon icon={faPen} onClick={() => {setModalOpen(true)}}/>
                                {
          modalOpen &&
    <div className={'modal-container'} ref={modalBackground}>
        <div className={'modal-content'}>
            <div className="Product">
                <div className="product">
                <label>상품정보 수정하기</label>
                <input type="text" onChange={handleChange} name="name" placeholder="이름" className="product-input"  />
                <input type="text" onChange={handleChange} name="quantity" placeholder="수량" className="product-input"/>
                <input type="number" onChange={handleChange} name="price" placeholder="가격" className="product-input"/>
                <input type="number" onChange={handleChange} name="discount_rate" placeholder="할인율" className="product-input" />
                <input type="number" onChange={handleChange} name="discounted_price" placeholder="할인된 가격" className="product-input" />
                <input type="date" onChange={handleChange} name="date" placeholder="날짜" className="product-input" />
                <button onClick={handleClick} className="btn">수정</button>
                </div>
            </div>
        </div>
    </div>
        }
                            </td>     
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};
export default Search;