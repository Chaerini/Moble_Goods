import './login.css';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

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
            const res = await axios.post(`http://localhost:8080/api/auth/login`, credentials, { withCredentials: true });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            console.log(res.data.details);
            navigate('/');
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleClick(e);
        }
    }

    return (
        <div className="login">
            <div className="login-container">
                <h1>로고</h1>
                <input type='text' placeholder='아이디 입력' className='login-input' id='username' onChange={handleChange}></input>
                <input type='password' placeholder='비밀번호 입력' className='login-input' id='password' onChange={handleChange} onKeyDown={handleKeyPress}></input>
                <button className='login-button' disabled={loading} onClick={handleClick}>로그인</button>
                <div className='login-div-a'>
                    <a className='login-a' href='/register'>회원가입</a>
                    <span className='login-line'>|</span>
                    <a className='login-a'>비밀번호 찾기</a>
                </div>
            </div>
        </div>
    );
};

export default Login;