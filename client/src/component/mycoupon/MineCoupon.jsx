import { useContext, useEffect, useState } from 'react';
import './minecoupon.css';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const MineCoupon = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const { user } = useContext(AuthContext);
    const [couponData, setCouponData] = useState();
    const [todayDate, setTodayDate] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${apiUrl}/usercoupons/${user.id}`, {}, { headers: { 'auth-token': user.token }, withCredentials: true });
                setCouponData(res.data.result);
                console.log(res.data.result);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
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
        return (`${year}-${month}-${day}`);
    }

    // 소멸 예정 계산
    const disappear = (today, end) => {
        const todate = new Date(today);
        const enddate = new Date(end);
        const timeDifference = enddate - todate;
        const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
        return dayDifference <= 3;
    }

    return (
        <div className="minecoupon">
            <table className="minecoupon-table">
                <colgroup>
                    <col style={{ width: '45%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                </colgroup>
                <tr>
                    <th className='minecoupon-th'>쿠폰명</th>
                    <th className='minecoupon-th'>할인 혜택</th>
                    <th className='minecoupon-th'>적용 기준</th>
                    <th className='minecoupon-th'>유효 기간</th>
                    <th className='minecoupon-th'>비고</th>
                </tr>
                {!couponData || couponData.length <= 0 ? (
                    <tr className="minecoupon-not"><td colSpan="5">사용 가능한 쿠폰이 없습니다.</td></tr>
                ) : (
                    couponData.map((coupon, index) => (
                        <tr className='minecoupon-tr' key={index}>
                            <td className='minecoupon-td'>{coupon.name}</td>
                            <td className='minecoupon-td'>{coupon.discount}원</td>
                            <td className='minecoupon-td'>{coupon.conditions}원 이상 구매시</td>
                            <td className='minecoupon-td'>{formatDate(coupon.end_date)}까지</td>
                            <td className='minecoupon-td'>
                                {disappear(formattodayDate(), formatDate(coupon.end_date)) ? (
                                    <button className='minecoupon-button'>소멸 예정</button>
                                ) : (<></>)}
                            </td>
                        </tr>
                    ))
                )}

            </table>
        </div>
    );
};

export default MineCoupon;