import { useNavigate } from 'react-router-dom';
import './allcoupon.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const AllCoupon = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [couponData, setCouponData] = useState();
    const [todayDate, setTodayDate] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${apiUrl}/coupons/no/${user.id}`, {}, { headers: { 'auth-token': user.token }, withCredentials: true });
                setCouponData(res.data.result);
                console.log(res.data.result);
            } catch (err) {
                alert('쿠폰 정보를 불러오는 데 실패했습니다. 다시 시도해주세요.');
                console.log(err);
            }
        }
        fetchData();
        formattodayDate();
    }, [])

    // 주문일자 날짜 포맷
    const formatDate = (endDate) => {
        let result = new Date(endDate);
        result.setDate(result.getDate() + 1);
        return result.toISOString().split('T')[0];
    }

    // 현재 날짜 포맷
    const formattodayDate = () => {
        const result = new Date();
        const year = result.getFullYear();
        const month = String(result.getMonth() + 1).padStart(2, '0');
        const day = String(result.getDate()).padStart(2, '0');
        setTodayDate(`${year}-${month}-${day}`);
        return (`${year}-${month}-${day}`);
    }

    // 소멸 예정 계산
    const disappear = (today, end) => {
        const todate = new Date(today);
        const enddate = new Date(end);
        if (todate - enddate < (1000 * 60 * 60 * 24 * 3)) {
            return true;
        } else {
            return false;
        }
    }

    // 발급 버튼 누르면
    const issueClick = async (id) => {
        try {
            const res = await axios.post(`${apiUrl}/usercoupons`, { coupon_id: id, user_id: user.id }, {
                headers: { 'auth-token': user.token },
                withCredentials: true
            })
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="allcoupon">
            <table className="allcoupon-table">
                <colgroup>
                    <col style={{ width: '45%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                </colgroup>
                <tr>
                    <th className='allcoupon-th'>쿠폰명</th>
                    <th className='allcoupon-th'>할인 혜택</th>
                    <th className='allcoupon-th'>적용 기준</th>
                    <th className='allcoupon-th'>유효 기간</th>
                    <th className='allcoupon-th'>발급</th>
                </tr>
                {!couponData || couponData.length <= 0 ? (
                    <tr className="allcoupon-not"><td colSpan="4">받을 수 있는 쿠폰이 없습니다.</td></tr>
                ) : (
                    couponData.map((coupon, index) => (
                        <tr className='allcoupon-tr' key={index}>
                            <td className='allcoupon-td'>{coupon.name}</td>
                            <td className='allcoupon-td'>{coupon.discount}원</td>
                            <td className='allcoupon-td'>{coupon.conditions}원 이상 구매시</td>
                            <td className='allcoupon-td'>{formatDate(coupon.end_date)}까지</td>
                            <td className='allcoupon-td'>
                                {/* {disappear(todayDate, formatDate(coupon.end_date)) ? (
                                    <button className='allcoupon-button'>소멸 예정</button>
                                ) : <></>} */}
                                <button className='allcoupon-button' onClick={() => issueClick(coupon.id)}>발급</button>
                            </td>
                        </tr>
                    ))

                )}

            </table>
        </div>
    );
};

export default AllCoupon;