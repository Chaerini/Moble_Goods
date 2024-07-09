import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import './OrderCouponModal.css';

const apiUrl = process.env.REACT_APP_API_URL;

function OrderCouponModal({ onClose, applyCoupon, userId }) {
    const [coupons, setCoupons] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await axios.get(`${apiUrl}/usercoupons/${userId}`);
                console.log(response.data.result); // 데이터 확인을 위해 콘솔 로그 추가
                setCoupons(response.data.result); // 서버에서 응답받은 쿠폰 리스트를 설정합니다.
            } catch (error) {
                console.error('쿠폰을 불러오는 중 오류가 발생했습니다:', error);
            }
        };
        fetchCoupons();
    }, [userId]);

    return (
        <div className="order-coupon-modal-overlay">
            <div className="order-coupon-modal-content">
                <button className="order-coupon-close-button" onClick={onClose}>X</button>
                <h2>사용 가능한 쿠폰</h2>
                <ul className="order-coupon-list">
                    {coupons.length === 0 ? (
                        <li>사용 가능한 쿠폰이 없습니다.</li>
                    ) : (
                        coupons.map(coupon => (
                            <li key={coupon.id}>
                                <span>{coupon.name} - {coupon.discount}원 할인</span>
                                <button onClick={() => applyCoupon(coupon)}>적용</button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default OrderCouponModal;
