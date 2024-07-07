import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "../productManage/productmanage.css";
import "../../Context/ProductContext"
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate,Link,useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef } from 'react';
import "../userManage/Modal.css";
const GetCoupon= () => {
    const navigate=useNavigate();
    const { user } = useContext(AuthContext);
    const [mpData,setMpData] = useState({
        userId:"",
        name:"",
        discount:"",
        start_date:"",
        end_date:"",
        conditions:""

    });
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/coupons`,);
                console.log("data",response.data.result);
                setData(response.data.result);
            }catch (error) {
                console.error('Error fetching data', error);
            }
        };
        
        fetchData();
    }, []);
    const handleDelete  = async(id) =>{
        try{
            await axios.delete(`http://localhost:8080/api/coupons/`+id)
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
        console.log("product",user);
        setMpData({
            userId:user.id,
            name: user.name,
            discount:user.discount,
            start_date:user.start_date,
            end_date:user.end_date,
            conditions:user.conditions,
          });
        setModalOpen(true);
        console.log(mpData)
    }

    const handleEditAction = async (userId) =>{
        setModalOpen(false);
        console.log(mpData)
        console.log("=======아이디=====",userId)
        try {
            const res=await axios.put(`http://localhost:8080/api/coupons/`+userId,mpData);
            alert('쿠폰 정보가 수정되었습니다.');
        } catch (err) {
            alert('쿠폰정보 수정을 실패했습니다. 다시 시도해주세요.')
            console.log(err);
        }
    }
    console.log(mpData)
    return (
        <div>
        <div className="product-container">
            <h2 className='notice'>쿠폰</h2>
            <FontAwesomeIcon icon={faPlus} onClick={()=>navigate("/addcoupon")}/>
            <table className='notice-table'>
                <thead>
                    <tr>
                        <th className='th'>이름</th>
                        <th className='th'>할인</th>
                        <th className='th'>시작일</th>
                        <th className='th'>만료일</th>
                        <th className='th'>조건</th>
                        <th className='th'>삭제/수정</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id} className='tr'>
                            <td className='td'>{user.name}</td>
                            <td className='td'>{user.discount}</td>
                            <td className='td'>{user.start_date}</td>
                            <td className='td'>{user.end_date}</td>
                            <td className='td'>{user.conditions}</td>
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
        
            <div className="login">
                <div className="login-container">
                <label>쿠폰정보 수정하기</label>
                <input type="hidden"  name="id"  className="product-input" value={mpData.userId}/>
                <input type="text" onChange={handleChange} name="name" placeholder="이름" className="product-input" value={mpData.name}/>
                <input type="text" onChange={handleChange} name="discount" placeholder="할인" className="product-input" value={mpData.discount}/>
                <input type="text" onChange={handleChange} name="start_date" placeholder="시작일" className="product-input" value={mpData.start_date}/>
                <input type="text" onChange={handleChange} name="end_date" placeholder="만료일" className="product-input" value={mpData.end_date}/>
                <input type="text" onChange={handleChange} name="conditions" placeholder="조건" className="product-input" value={mpData.conditions}/>
                <button onClick={()=>handleEditAction(mpData.userId)} className="btn">수정</button>
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
export default GetCoupon;