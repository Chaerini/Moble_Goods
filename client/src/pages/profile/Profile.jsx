import { useContext, useEffect, useState } from 'react';
import './profile.css';
import Header from '../../component/header/header';
import Navbar from '../../component/navbar/navbar';
import Footer from '../../component/footer/footer';
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        name: '',
        address: '',
        phone: ''
    })
    const [isChangePassword, setIsChangePassword] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${apiUrl}/users/${user.id}`, { headers: { 'auth-token': user.token }, withCredentials: true });
                setUserData(res.data);
            } catch (err) {
                alert("사용자 정보 조회에 실패했습니다. 다시 시도해주세요.");
                console.log(err);
            }
        }
        fetchData();
    }, [])

    const ChangePasswordClick = () => {
        setIsChangePassword(!isChangePassword);
    }

    const handleClick = async () => {
        try {
            const res = await axios.put(`${apiUrl}/users/${user.id}`, userData, { withCredentials: true });
            alert('회원 정보가 수정되었습니다.');
            navigate('/profile');
        } catch (err) {
            alert('회원정보 수정을 실패했습니다. 다시 시도해주세요.')
            console.log(err);
        }
    }

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [id]: value
        }));
        console.log(id, ",", value);
    }

    return (
        <>
            <Header />
            <Navbar />

            <div className="profile">
                <div className="profile-container">
                    <h1 className='profile-h1'>회원 정보수정</h1>
                    <div className='profile-top'><span>기본 정보</span></div>
                    <div className='profile-list'>
                        <span className='profile-left'>이름<em className='profile-em'>*</em></span>
                        <input type='text' placeholder='이름 입력' className='profile-input' id='name' value={userData?.name} onChange={handleChange}></input>
                    </div>
                    <div className='profile-list'>
                        <span className='profile-left'>아이디<em className='profile-em'>*</em></span>
                        <input type='text' className='profile-input-readonly' value={user?.username} readOnly></input>
                    </div>
                    <div className='profile-list'>
                        <span className='profile-left'>비밀번호<em className='profile-em'>*</em></span>
                        {isChangePassword ? (<div></div>) : (
                            <button className='profile-change-btn' onClick={ChangePasswordClick}>변경하기</button>
                        )}

                        {isChangePassword &&
                            <div>
                                <div className='profile-pwd-list'>
                                    <span className='profile-pwd-left'>현재 비밀번호</span>
                                    <input type='text' placeholder='현재 비밀번호 입력' className='profile-pwd-input'></input>
                                </div>
                                <div className='profile-pwd-list'>
                                    <span className='profile-pwd-left'>새 비밀번호</span>
                                    <input type='text' placeholder='비밀번호(영문·숫자 조합 8~15자리)' className='profile-pwd-input'></input>
                                </div>
                                <div className='profile-pwd-list'>
                                    <span className='profile-pwd-left'>현재 비밀번호</span>
                                    <input type='text' placeholder='새 비밀번호 확인' className='profile-pwd-input'></input>
                                </div>
                                <div className='profile-cancel'><span onClick={ChangePasswordClick}>취소</span></div>
                            </div>
                        }

                    </div>
                    <div className='profile-list'>
                        <span className='profile-left'>주소</span>
                        <input type='text' placeholder='주소 입력' className='profile-input' id='address' value={userData?.address} onChange={handleChange}></input>
                    </div>
                    <div className='profile-list'>
                        <div className='profile-left'><span>연락처<em className='profile-em'>*</em></span></div>
                        <div className='profile-right'>
                            <div><input type='text' placeholder='연락처 입력(숫자만 입력)' className='profile-input' id='phone' value={userData?.phone} onChange={handleChange}></input></div>
                            <div className='profile-agreement'><input type='checkbox'></input><label>개인정보 수집 및 이용 동의 [필수]</label></div>
                            <div className='profile-agreement'><input type='checkbox'></input><label>상품·이벤트 정보 SMS 수신 동의 [선택]</label></div>
                            <div className='profile-agreement'><input type='checkbox'></input><label>전화상담을 통한 안내 수신 동의 [선택]</label></div>
                        </div>
                    </div>
                    <div className='profile-bottom'>
                        <span onClick={() => navigate('/withdraw')}>회원탈퇴</span>
                    </div>
                    <div className='profile-button'>
                        <button className='profile-cancel-btn'>취소</button>
                        <button className='profile-check-btn' onClick={handleClick}>확인</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;