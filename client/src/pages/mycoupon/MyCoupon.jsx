import './mycoupon.css';
import { faCrown, faTicket, faGift } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MineCoupon from '../../component/mycoupon/MineCoupon';
import AllCoupon from '../../component/mycoupon/AllCoupon';
import Navbar from '../../component/navbar/navbar';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';


const MyCoupon = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [isMenu, setIsMenu] = useState("all");
    const [useCount, setUseCount] = useState(0);
    const [downloadCount, setDownloadCount] = useState(0);

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(`${apiUrl}/coupons/not/${user.id}`, {}, {
                headers: { 'auth-token': user.token },
                withCredentials: true
            })
            const result = await axios.get(`${apiUrl}/usercoupons/${user.id}`, {}, {
                headers: { 'auth-token': user.token },
                withCredentials: true
            })
            console.log(res.data);
            setDownloadCount(res.data.result.length);
            setUseCount(result.data.result.length);
        } catch (err) {
            console.log(err);
        }
    });

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Header />
            <Navbar />

            <div className='mycoupon'>

                <div className='mycoupon-container'>
                    <h1 className='mycoupon-title'>쿠폰</h1>
                    <div className='mycoupon-dashboard'>
                        <div className='mycoupon-membership'>
                            <div className='mycoupon-membership-left'>
                                <FontAwesomeIcon icon={faCrown} className='mycoupon-icon-bronze' />
                            </div>
                            <div className='mycoupon-membership-right'>
                                <p className='mycoupon-membership-p-top'>{user?.name}님 환영합니다!</p>
                                <p className='mycoupon-membership-p-bottom'>구매 후 쿠폰혜택을 누리세요</p>
                                <p className='mycoupon-membership-p-bottom'>추가 주문 건수 1건 이상 SILVER 등급이 됩니다.</p>
                            </div>
                        </div>
                        <div className='mycoupon-use'>
                            <FontAwesomeIcon icon={faTicket} className='mycoupon-icon-ticket' />
                            <p className='mycoupon-use-p-top'>사용 가능 쿠폰</p>
                            <p className='mycoupon-use-p-bottom'><em className='mycoupon-em'>{useCount}</em>장</p>
                        </div>
                        <div className='mycoupon-download'>
                            <FontAwesomeIcon icon={faGift} className='mycoupon-icon-download' />
                            <p className='mycoupon-download-p-top'>받을 수 있는 쿠폰</p>
                            <p className='mycoupon-download-p-bottom'><em className='mycoupon-em'>{downloadCount}</em>장</p>
                        </div>
                    </div>
                    <div className='mycoupon-menu'>
                        <button className={isMenu === 'all' ? ('mycoupon-all-click') : ('mycoupon-all')} onClick={() => setIsMenu('all')}>전체 쿠폰</button>
                        <button className={isMenu === 'mine' ? ('mycoupon-mine-click') : ('mycoupon-mine')} onClick={() => setIsMenu('mine')}>내 쿠폰</button>
                    </div>
                    <div className='myreview-middle'>
                        {isMenu === 'all' ? (<AllCoupon onFetchData={fetchData} />) : (<MineCoupon />)}

                    </div>
                    <div className='mycoupon-notice'>
                        <p className='mycoupon-notice-top'>굿포유 쿠폰 이용 안내</p>
                        <p className='mycoupon-notice-bottom'>· 쿠폰은 중복 사용할 수 없으며, 결제 한 번에 1장만 사용 가능합니다.</p>
                        <p className='mycoupon-notice-bottom'>· 쿠폰 할인은 할인 이벤트와 중복되지 않으며, 쿠폰 적용 시 정상가 기준으로 적용됩니다.</p>
                        <p className='mycoupon-notice-bottom-red'>· 모든 쿠폰은 유효기간 이후에는 자동으로 소멸됩니다.</p>
                        <p className='mycoupon-notice-bottom'>· 할인권 쿠폰은 분할 사용이 불가능합니다.</p>
                        <p className='mycoupon-notice-bottom'>· 쿠폰은 결제 페이지에서 각 상품에 '쿠폰 적용' 시 사용이 가능합니다.</p>
                        <p className='mycoupon-notice-bottom'>· 주문 취소 시 해당 주문에 사용한 쿠폰의 유효기간이 만료된 경우 재발급되지 않습니다. 단, 품질 이상에 따른 사유로 반품 처리되는 경우에는 재발급이 가능합니다.</p>
                    </div>
                </div>
            </div >
            <Footer />
        </>
    );
};

export default MyCoupon;