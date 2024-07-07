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
            name: user.name,
            address: user.address,
            phone: user.phone,
            membership_name:user.membership_name,
          });
        setModalOpen(true);
        console.log(mpData)
    }
    const handleDelete  = async(id) =>{
        try{
            await axios.delete(`http://localhost:8080/api/users/`+id)
            window.location.reload();
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
    return(
        <div>
            <div>
                <div>
                    <div className="search-input-wrap">
                    <h2><FontAwesomeIcon icon={faUser}/>고객</h2>
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
                </div>
            <div>
                    <table className="orderManage-table">
                    <thead className="search-table-head">
                        <tr>
                            <th className='orderManage-th'>이름</th>
                            <th className='orderManage-th'>아이디</th>
                            <th className='orderManage-th'>주소</th>
                            <th className='orderManage-th'>핸드폰</th>
                            <th className='orderManage-th'>멤버십</th>
                            <th className="orderManage-th">수정</th>
                            <th className="orderManage-th">삭제</th>
                        </tr>
                        </thead>
                        <tbody className="orderManage-table-body">
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
                        </tbody>
                </table>
        {
          modalOpen &&
    <div className={'modal-container'} ref={modalBackground} onClick={e => {
        if(e.target===modalBackground.currnet){
            setModalOpen(false);
        }
    }}>
        <div className={'modal-content'}>
            <div className="Product">
                <div className="product">
                <label>고객정보 수정하기</label>
                <input type="hidden"  name="id"  className="product-input" value={mpData.userId}/>
                <input type="text" onChange={handleChange} name="name" placeholder="이름" className="product-input" value={mpData.name}/>
                <input type="text" onChange={handleChange} name="address" placeholder="주소" className="product-input" value={mpData.address}/>
                <input type="text" onChange={handleChange} name="phone" placeholder="핸드폰" className="product-input" value={mpData.phone}/>
                <button onClick={()=>handleEditAction(mpData.userId)} className="btn">수정</button>
                </div>
            </div>
        </div>
    </div>
        }
                </div>
            </div>
        </div>
    )
}
export default SearchUser;