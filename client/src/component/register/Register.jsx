import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css';

const Register = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        name: undefined,
        phone: undefined,
        passwordcheck: undefined
    });

    const [isCredentialsCheck, setIsCredentialsCheck] = useState({
        username: undefined,
        password: undefined,
        name: undefined,
        phone: undefined,
        passwordcheck: undefined
    });

    const [isCheck, setIsCheck] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
        // console.log("id:", e.target.id, "value:", e.target.value);
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const { passwordcheck, ...userData } = credentials;

            const res = await axios.post(`${apiUrl}/auth/register`, userData);
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }

    const PasswordCheck = () => {
        if (credentials.password !== credentials.passwordcheck) {
            setIsCheck(false);
        } else {
            setIsCheck(true);
        }
    }

    const credentialsCheck = () => {
        if (credentials.username === undefined || credentials.username === '') {
            setIsCredentialsCheck(prev => ({
                ...prev,
                username: false
            }))
            console.log(isCredentialsCheck.username);
        } else if (credentials.password === undefined || credentials.password === '') {
            setIsCredentialsCheck(prev => ({
                ...prev,
                password: false
            }))
        } else if (credentials.passwordcheck === undefined || credentials.passwordcheck === '') {
            setIsCredentialsCheck(prev => ({
                ...prev,
                passwordcheck: false
            }))
        } else if (credentials.name === undefined || credentials.name === '') {
            setIsCredentialsCheck(prev => ({
                ...prev,
                name: false
            }))
        } else if (credentials.phone === undefined || credentials.phone === '') {
            setIsCredentialsCheck(prev => ({
                ...prev,
                phone: false
            }))
        }
    }

    return (
        <div className="register">
            <div className="register-container">
                <h1 className='register-h1'>회원가입</h1>
                <div className='register-list'>
                    <span className='register-left'>아이디<em className='register-em'>*</em></span>
                    <div className='register-input-wrap'>
                        <input type='text' placeholder='아이디 입력' className='register-input' id='username' onChange={handleChange} onBlur={credentialsCheck}></input>
                        {isCredentialsCheck.username === false ? (
                            <div><span className='register-input-error'>필수 항목입니다.</span></div>) : (<></>)}
                    </div>
                </div>
                <div className='register-list'>
                    <span className='register-left'>비밀번호<em className='register-em'>*</em></span>
                    <input type='text' placeholder='비밀번호(영문·숫자 조합 8~15자리)' className='register-input' id='password' onChange={handleChange}></input>
                </div>
                <div className='register-list'>
                    <span className='register-left'>비밀번호 확인<em className='register-em'>*</em></span>
                    <input type='text' placeholder='비밀번호 확인' className='register-input' id='passwordcheck' onChange={handleChange} onBlur={PasswordCheck}></input>
                </div>
                <div className='register-list'>
                    <span className='register-left'>이름<em className='register-em'>*</em></span>
                    <input type='text' placeholder='이름 입력' className='register-input' id='name' onChange={handleChange}></input>
                </div>
                <div className='register-list'>
                    <span className='register-left'>연락처<em className='register-em'>*</em></span>
                    <input type='text' placeholder='연락처(숫자만 입력)' className='register-input' id='phone' onChange={handleChange}></input>
                </div>
                <div className='register-agreement'>
                    <div><input type='checkbox'></input><label><b>전체동의</b></label></div>
                    <div><input type='checkbox'></input><label>만 14세 이상입니다. (필수)</label></div>
                    <div><input type='checkbox'></input><label>굿포유 <a href='/'>이용 약관</a> 동의 (필수)</label></div>
                    <div><input type='checkbox'></input><label><a href='/'>개인정보 수집 및 이용</a> 동의 (필수)</label></div>
                </div>
                <button className='register-button' onClick={handleClick}>완료</button>
            </div>
        </div>
    );
};

export default Register;