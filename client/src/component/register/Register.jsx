import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faX
} from "@fortawesome/free-solid-svg-icons";
import Login from '../login/Login.jsx';
import axios from 'axios';
import './register.css';

const Register = ({ setOpen }) => {
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

    const [isPasswordCheck, setIsPasswordCheck] = useState(undefined);
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));

        // 비밀번호 확인
        if (id === 'passwordcheck') {
            if (credentials.password !== value) {
                setIsPasswordCheck(false);
                console.log(credentials.password, ",", value);
            } else {
                setIsPasswordCheck(true);
                console.log(credentials.password, ",", value);
            }
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            console.log(AllCheck());
            if (AllCheck()) {
                const apiUrl = process.env.REACT_APP_API_URL;
                const { passwordcheck, ...userData } = credentials;

                const res = await axios.post(`${apiUrl}/auth/register`, userData);
                setOpen(false);
            } else {
                alert('모든 필수 입력 항목을 입력하세요.');
            }

        } catch (err) {
            console.log(err);
        }
    }

    const credentialsCheck = (e) => {
        const { id, value } = e.target;
        setIsCredentialsCheck(prev => ({
            ...prev,
            [id]: value !== undefined && value.trim() !== ''
        }));
    }

    const AllCheck = () => {
        return (
            isCredentialsCheck.username &&
            isCredentialsCheck.password &&
            isCredentialsCheck.passwordcheck &&
            isCredentialsCheck.name &&
            isCredentialsCheck.phone
        );
    };

    // x 버튼 클릭했을 때 모달 없앰
    const xClick = () => {
        setOpen(false);
    }

    return (
        <>
            <div className="register">
                <div className="register-container">
                    <div className='login-top'><FontAwesomeIcon icon={faX} className="myorderdetail-icon" onClick={() => xClick()} /></div>
                    <h1 className='register-h1'>회원가입</h1>
                    <div className='register-list'>
                        <span className='register-left'>아이디<em className='register-em'>*</em></span>
                        <div className='register-input-wrap'>
                            <input type='text' placeholder='아이디 입력' className={isCredentialsCheck.username === false ? ('register-input-red') : ('register-input')} id='username' onChange={handleChange} onBlur={credentialsCheck}></input>
                            {isCredentialsCheck.username === false ? (
                                <div><span className='register-input-error'>필수 항목입니다.</span></div>) : (<></>)}
                        </div>
                    </div>
                    <div className='register-list'>
                        <span className='register-left'>비밀번호<em className='register-em'>*</em></span>
                        <div className='register-input-wrap'>
                            <input type='text' placeholder='비밀번호(영문·숫자 조합 8~15자리)' className={isCredentialsCheck.password === false ? ('register-input-red') : ('register-input')} id='password' onChange={handleChange} onBlur={credentialsCheck}></input>
                            {isCredentialsCheck.password === false ? (
                                <div><span className='register-input-error'>필수 항목입니다.</span></div>) : (<></>)}
                        </div>
                    </div>
                    <div className='register-list'>
                        <span className='register-left'>비밀번호 확인<em className='register-em'>*</em></span>
                        <div className='register-input-wrap'>
                            <input type='text' placeholder='비밀번호 확인' className={isCredentialsCheck.passwordcheck === false ? ('register-input-red') : ('register-input')} id='passwordcheck' onChange={handleChange} onBlur={credentialsCheck}></input>
                            {isCredentialsCheck.passwordcheck === false ? (
                                <div><span className='register-input-error'>필수 항목입니다.</span></div>) : (<></>)}
                            {isPasswordCheck === false && isCredentialsCheck.passwordcheck === true ? (
                                <div><span className='register-input-error'>비밀번호가 일치하지 않습니다.</span></div>) : (<></>)}
                        </div>
                    </div>
                    <div className='register-list'>
                        <span className='register-left'>이름<em className='register-em'>*</em></span>
                        <div className='register-input-wrap'>
                            <input type='text' placeholder='이름 입력' className={isCredentialsCheck.name === false ? ('register-input-red') : ('register-input')} id='name' onChange={handleChange} onBlur={credentialsCheck}></input>
                            {isCredentialsCheck.name === false ? (
                                <div><span className='register-input-error'>필수 항목입니다.</span></div>) : (<></>)}
                        </div>
                    </div>
                    <div className='register-list'>
                        <span className='register-left'>연락처<em className='register-em'>*</em></span>
                        <div className='register-input-wrap'>
                            <input type='text' placeholder='연락처(숫자만 입력)' className={isCredentialsCheck.phone === false ? ('register-input-red') : ('register-input')} id='phone' onChange={handleChange} onBlur={credentialsCheck}></input>
                            {isCredentialsCheck.phone === false ? (
                                <div><span className='register-input-error'>필수 항목입니다.</span></div>) : (<></>)}
                        </div>
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
            {openModal && <Login setOpen={setOpenModal} />}
        </>
    );
};

export default Register;