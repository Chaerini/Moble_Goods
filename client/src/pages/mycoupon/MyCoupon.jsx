import './mycoupon.css';
import { faCrown, faTicket, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyCoupon = () => {
    return (
        <div className='mycoupon'>
            <div className='mycoupon-container'>
                <h1 className='mycoupon-title'>쿠폰</h1>
                <div className='mycoupon-dashboard'>
                    <div className='mycoupon-membership'>
                        <div className='mycoupon-membership-left'>
                            <FontAwesomeIcon icon={faCrown} className='mycoupon-icon-bronze' />
                        </div>
                        <div className='mycoupon-membership-right'>
                            <p className='mycoupon-membership-p-top'>이채린님 환영합니다!</p>
                            <p className='mycoupon-membership-p-bottom'>구매 후 쿠폰혜택을 누리세요</p>
                            <p className='mycoupon-membership-p-bottom'>추가 주문 건수 1건 이상 SILVER 등급이 됩니다.</p>
                        </div>
                    </div>
                    <div className='mycoupon-use'>
                        <FontAwesomeIcon icon={faTicket} className='mycoupon-icon-ticket' />
                        <p className='mycoupon-use-p-top'>사용 가능 쿠폰</p>
                        <p className='mycoupon-use-p-bottom'><em className='mycoupon-em'>0</em>장</p>
                    </div>
                    <div className='mycoupon-download'>
                        <FontAwesomeIcon icon={faArrowDown} className='mycoupon-icon-download' />
                        <p className='mycoupon-download-p-top'>받을 수 있는 쿠폰</p>
                        <p className='mycoupon-download-p-bottom'><em className='mycoupon-em'>0</em>장</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MyCoupon;