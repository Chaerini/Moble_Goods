import './writablereview.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const WritableReview = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [reviewData, setReviewData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${apiUrl}/reviews/writable/${user.id}`, {}, { headers: { 'auth-token': user.token }, withCredentials: true });

                // 작성 기한이 지나면 목록에 뜨지 않도록 구현
                const filteredData = res.data.result.filter(review => {
                    const deadline = new Date(review.order_date);
                    deadline.setDate(deadline.getDate() + 13);
                    return deadline >= new Date();
                });

                setReviewData(filteredData);
            } catch (err) {
                alert("리뷰 조회에 실패했습니다. 다시 시도해주세요.");
                console.log(err);
            }
        }
        fetchData();
    }, []);

    // 주문일자 날짜 포맷
    const formatDate = (orderDate) => {
        let result = new Date(orderDate);
        return result.toISOString().split('T')[0];
    }

    // 작성기한 날짜 계산 (order_date + 14)
    const withinDate = (orderDate) => {
        let result = new Date(orderDate);
        result.setDate(result.getDate() + 14);
        return result.toISOString().split('T')[0];
    }

    // 남은 날짜 계산 (현재날짜 - 작성기한 날짜)
    const dDay = (orderDate) => {
        let result = new Date(orderDate);
        result.setDate(result.getDate() + 13);
        const today = new Date();
        const dDayTime = result - today;
        const dDay = Math.ceil(dDayTime / (1000 * 60 * 60 * 24));
        return dDay;
    }

    return (
        <div className="writablereview">
            <table className="writablereview-table">
                <colgroup>
                    <col style={{ width: '60%' }} />
                    <col style={{ width: '13%' }} />
                    <col style={{ width: '13%' }} />
                    <col style={{ width: '13%' }} />
                </colgroup>
                <tr>
                    <th className='writablereview-th'>상품정보</th>
                    <th className='writablereview-th'>주문일자</th>
                    <th className='writablereview-th'>작성기한</th>
                    <th className='writablereview-th'>리뷰쓰기</th>
                </tr>

                {(!reviewData || reviewData.length <= 0) ? (
                    <tr className="writablereview-not"><td colSpan="4">작성 가능한 리뷰가 없습니다.</td></tr>
                ) : (
                    reviewData.map((review, index) => (
                        <tr className='writablereview-tr'>
                            <td>
                                <div className='writablereview-row'>
                                    <div><img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writablereview-image'></img></div>
                                    <div className='writablereview-right'>
                                        <p className='writablereview-title'>{review.name}</p>
                                        <p className='writablereview-quantity'>수량 : {review.quantity}개</p>
                                    </div>
                                </div>
                            </td>
                            <td className='writablereview-td'>{formatDate(review.order_date)}</td>
                            <td className='writablereview-td'>{withinDate(review.order_date)}(D-{dDay(review.order_date)})</td>
                            <td className='writablereview-td'><button className='writablereview-button'>리뷰작성</button></td>
                        </tr>
                    ))

                )}

            </table>
        </div>
    );
};

export default WritableReview;