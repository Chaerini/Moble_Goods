import {
    faHouse,
    faBook,
    faUser,
    faX,
    faPen,
    faTrash,
    faMagnifyingGlass,
    faPlus
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState,useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

    // 사용자 정보가 업데이트 됐을 경우 렌더링
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/products`,);
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
        e.preventDefault();
        try {
            const res = await axios.get(`${apiUrl}/search?name=${searchWord}`);
            setData(res.data.result);
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
    const handleDelete  = async(id) =>{
        try{
            await axios.delete(`http://localhost:8080/api/products/`+id)
            window.location.reload();
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
            const res=await axios.put(`http://localhost:8080/api/products/`+userId,mpData, { withCredentials: true });
            alert('상품 정보가 수정되었습니다.');
        } catch (err) {
            alert('상품정보 수정을 실패했습니다. 다시 시도해주세요.')
            console.log(err);
        }
    }
    return (
        <div>
            <div>
                <div className="search-input-wrap">
                        <input type="text" placeholder  className="search-input" onChange={(e) => setSearchWord(e.target.value)} onKeyDown={handleKeyPress}></input>
                        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={handleSearch}/>
                </div>
                    <div className="product-container">
                    <FontAwesomeIcon icon={faPlus} onClick={()=>navigate("/addproduct")}/>
                        <table className="notice-table">
                            <tr>
                            <th className='th'>이름</th>
                            <th className='th'>수량</th>
                            <th className='th'>할인율</th>
                            <th className='th'>할인된 가격</th>
                            <th className='th'>날짜</th>
                            <th className="th">삭제/수정</th>
                            </tr>
                            {(!Data || Data.length < 0) ? (
                                <tr className="table-content">사용자 정보가 없습니다.</tr>
                            ) : (
                                Data.map((user, index) => (
                                    <tr className="product-content" key={index}>
                                        <td className="td">{user.name}</td>
                                        <td className="td">{user.quantity}</td>
                                        <td className="td">{user.discount_rate}</td>
                                        <td className="td">{user.discounted_price}</td>
                                        <td className="td">{user.date}</td>
                                        <td className="td">
                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} />
                                        <FontAwesomeIcon icon={faPen} onClick={() => handleEditClick(user)}/>
                                        </td>
                            
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
                                    </tr>
                                )))}

                        </table>


                    </div>
                </div>

            </div>
    );
};

export default Search;