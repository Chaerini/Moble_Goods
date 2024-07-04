import React,{useState,useEffect,useContext} from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../productManage/product.css"
import { AuthContext } from "../../Context/AuthContext";
const UpdateUser = () => {
    const [mpData,setMpData] = useState({
        name:"",
        address:"",
        phone:"",
        membership_name:""

    });
    const[editMode,setEditMode]=useState(false);
    const {user,dispatch} = useContext(AuthContext);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/users/${user.id}`, { headers: { 'auth-token': user.token }, withCredentials: true });
                setMpData(res.data);
            } catch (err) {
                alert("사용자 정보 조회에 실패했습니다. 다시 시도해주세요.");
                console.log(err);
            }
        }
        fetchData();
    }, [])
    const handleChange = (e) =>{
        const{name,value}=e.target;
        setMpData((prev) => ({...prev,[name]:value}));
    };
    const handleClick = async () =>{
        try {
            const res = await axios.put(`http://localhost:8080/api/users/${user.id}`, mpData, { withCredentials: true });
            alert('회원 정보가 수정되었습니다.');
            navigate('/getuser');
        } catch (err) {
            alert('회원정보 수정을 실패했습니다. 다시 시도해주세요.')
            console.log(err);
        }
    }
        const {name,address,phone,membership_name}=mpData;
        console.log(mpData);

return (
        <div className="Product">
            <div className="product">
            <label>고객정보 수정하기</label>
            <input type="text" onChange={handleChange} name="name" value={name} className="product-input"  />
            <input type="text" onChange={handleChange} name="address" value={address} className="product-input"/>
            <input type="number" onChange={handleChange} name="phone" value={phone} className="product-input"/>
            <input type="number" onChange={handleChange} name="membership_name" value={membership_name} className="product-input" />
            <button onClick={handleClick}><Link to="/getuser" className="btn">수정</Link></button>
            
            </div>
        </div>
        
    );
    
}
export default UpdateUser;
