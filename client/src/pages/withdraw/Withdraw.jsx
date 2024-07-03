import './withdraw.css';
import Navbar from '../../component/navbar/navbar';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Navbar />
            <div className="withdraw">
                <div className='withdraw-container'>
                    <div className='withdraw-title'>
                        <h1 className='withdraw-title-top'>잠깐! 정말 탈퇴를 원하세요?</h1>
                        <p className='withdraw-title-bottom'>회원 탈퇴 전 아래사항을 유의해주시기 바랍니다.</p>
                    </div>
                    <div className='withdraw-middle'>
                        <h2 className='withdraw-m-title'>회원 탈퇴 확인사항</h2>
                        <div className='withdraw-m-contents'>
                            <span className='withdraw-m-contents-top'>· 재가입하셔도 개인정보가 복원되지 않습니다.</span>
                            <span className='withdraw-m-contents-bottom'>굿포유에 가지고 계신 주문거래 내역, 편집중인 정보, 쿠폰 등의 혜택이 자동삭제 되며 재가입 하실 경우에도 복원되지 않습니다.</span>
                        </div>
                        <div className='withdraw-m-contents'>
                            <span className='withdraw-m-contents-top'>· 일정기간 동안 회원님의 정보가 보관됩니다.</span>
                            <span className='withdraw-m-contents-bottom'>전자상거래 소비자 보호 법류에 의거, 일정기간 동안 개인정보 등이 보존됩니다.</span>
                        </div>
                        <div className='withdraw-m-contents'>
                            <span className='withdraw-m-contents-top'>· 탈퇴 후 갤러리 등 서비스에 등록된 게시물이 삭제됩니다.</span>
                            <span className='withdraw-m-contents-bottom-em'>회원님의 리뷰 등은 탈퇴 시 자동으로 삭제되며, 재가입 하실 경우에도 복원되지 않습니다.</span>
                        </div>
                    </div>
                    <div className='withdraw-bottom'>
                        <button className='withdraw-cancel'>취소</button>
                        <button className='withdraw-withdraw' onClick={() => navigate('/profile')}>회원탈퇴</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Withdraw;