import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "../productManage/product.css";
import "../../Context/ProductContext"
import { AuthContext } from '../../Context/AuthContext';
import Search from "../../component/search/search";
import { useNavigate,Link,useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef } from 'react';
import "./Modal.css";
const GetUser = () => {
    const { user } = useContext(AuthContext);
    const [mpData,setMpData] = useState({
        userId:"",
        name:"",
        address:"",
        phone:"",

    });
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/users`,);
                console.log("data",response.data.rows);
                setData(response.data.rows);
            }catch (error) {
                console.error('Error fetching data', error);
            }
        };
        
        fetchData();
    }, []);
    const handleDelete  = async(id) =>{
        try{
            await axios.delete(`http://localhost:8080/api/users/`+id)
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }
    const location = useLocation();
    const  userId = location.pathname.split("/")[2]
    const handleChange = (e) =>{
        const{name,value}=e.target;
        setMpData((prev) => ({...prev,[name]:value}));
    };


    const handleEditClick = async(user) =>{

        console.log("user:",user);
        setMpData({
            userId:user.id,
            name: user.name,
            address: user.address,
            phone: user.phone,
          });
        setModalOpen(true);
        console.log(mpData)
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
    return (
        <div>
=        <div className="product-container">
            <h2 className='notice'>회원</h2>
            <table className='notice-table'>
                <thead>
                    <tr>
                        <th className='th'>이름</th>
                        <th className='th'>아이디</th>
                        <th className='th'>주소</th>
                        <th className='th'>핸드폰</th>
                        <th className='th'>멤버십</th>
                        <th className='th'>삭제/수정</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id} className='tr'>
                            <td className='td'>{user.name}</td>
                            <td className='td'>{user.username}</td>
                            <td className='td'>{user.address}</td>
                            <td className='td'>{user.phone}</td>
                            <td className='td'>{user.membership_name}</td>
                            <td className='td'>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} />
                                <FontAwesomeIcon icon={faPen} onClick={() => handleEditClick(user)}/>
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
                            </td>     
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    );
};
export default GetUser;