import './login.css';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faX
} from "@fortawesome/free-solid-svg-icons";
import Register from '../register/Register.jsx';
import axios from "axios";

const Login = ({ setOpen }) => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const [openRegisterModal, setOpenRegisterModal] = useState(false);
    const { loading, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };


    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${apiUrl}/auth/login`, credentials, { withCredentials: true });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            console.log(res.data.details);
            setOpen(false);
            setOpenRegisterModal(false);
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick(e);
        }
    }

    // x 버튼 클릭했을 때 모달 없앰
    const xClick = () => {
        setOpen(false);
    }

    return (
        <>
            <div className="login">
                <div className="login-container">
                    <div className='login-top'><FontAwesomeIcon icon={faX} className="myorderdetail-icon" onClick={() => xClick()} /></div>
                    <img src='/images/로고.png' className='login-image' />
                    <div className='login-input-wrap'>
                        <input type='text' placeholder='아이디 입력' className='login-input' id='username' onChange={handleChange}></input>
                        <input type='password' placeholder='비밀번호 입력' className='login-input' id='password' onChange={handleChange} onKeyDown={handleKeyPress}></input>
                    </div>
                    <button className='login-button' disabled={loading} onClick={handleClick}>로그인</button>
                    <div className='login-div-a'>
                        <span>아직 굿포유 회원이 아니신가요? <a className='login-a' onClick={() => setOpenRegisterModal(true)}>회원가입</a></span>
                    </div>
                </div>
            </div>
            {openRegisterModal && <Register setOpen={setOpenRegisterModal} />}
        </>
    );
};

export default Login;