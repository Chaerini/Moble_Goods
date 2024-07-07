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
import Search from '../../component/search/searchProduct';
import SearchUser from '../../component/search/searchUser';
const GetProduct= () => {
    const navigate=useNavigate();
    const { user } = useContext(AuthContext);
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
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products`,);
                console.log("data",response.data);
                setData(response.data);
            }catch (error) {
                console.error('Error fetching data', error);
            }
        };
        
        fetchData();
    }, []);
    const handleDelete  = async(id) =>{
        try{
            await axios.delete(`http://localhost:8080/api/products/`+id)
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
            quantity:user.quantity,
            price:user.price,
            discount_rate:user.discount_rate,
            discounted_price:user.discounted_price,
            date:user.date
          });
        setModalOpen(true);
        console.log(mpData)
    }

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
    console.log(mpData)
    const handleClick = async e =>{
        setModalOpen(false);
        try{
            await axios.post(`http://localhost:8080/api/products`,mpData);
            alert("상품이 추가되었습니다")
        }catch(err){
            alert("상품추가를 실패했습니다.")
            console.log(err);
        }
}
const handleAddClick = async(user) =>{
    console.log("product",user);
    setMpData({
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
    return (
        <div>
                <Search/>
        <div className="product-container">
            {/* <FontAwesomeIcon icon={faPlus} onClick={()=>navigate("/addproduct")}/>
            <table className='notice-table'>
                <thead>
                    <tr>
                        <th className='th'>이름</th>
                        <th className='th'>수량</th>
                        <th className='th'>가격</th>
                        <th className='th'>할인율</th>
                        <th className='th'>할인된 가격</th>
                        <th className='th'>날짜</th>
                        <th className='th'>삭제/수정</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user.id} className='tr'>
                            <td className='td'>{user.name}</td>
                            <td className='td'>{user.quantity}</td>
                            <td className='td'>{user.price}</td>
                            <td className='td'>{user.discount_rate}</td>
                            <td className='td'>{user.discounted_price}</td>
                            <td className='td'>{user.date}</td>
                            <td className='td'>
                                <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(user.id)} />
                                <FontAwesomeIcon icon={faPen} onClick={() => handleEditClick(user)}/>
        {
          modalOpen &&
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
                            </td>     
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    </div>
    );
};
export default GetProduct;