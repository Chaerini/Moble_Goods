import { useNavigate } from 'react-router-dom';
import './writtenreview.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

const WrittenReview = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [reviewData, setReviewData] = useState();

    const fetchData = async () => {
        try {
            const res = await axios.get(`${apiUrl}/reviews/user/${user.id}`, {}, { headers: { 'auth-token': user.token }, withCredentials: true });
            setReviewData(res.data.result);
            console.log(res.data.result);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    // 주문일자 날짜 포맷
    const formatDate = (orderDate) => {
        let result = new Date(orderDate);
        return result.toISOString().split('T')[0];
    }

    // 평점
    const formatRating = (rating) => {
        switch (rating) {
            case 1:
                return (
                    <>
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-not' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-not' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-not' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-not' />
                    </>
                );
            case 2:
                return (
                    <>
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-not' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-not' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-not' />
                    </>
                );
            case 3:
                return (
                    <>
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-not' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-not' />
                    </>
                );
            case 4:
                return (
                    <>
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-not' />
                    </>
                );
            case 5:
                return (
                    <>
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                        <FontAwesomeIcon icon={faStar} className='writtenreview-icon-select' />
                    </>
                );
        }
    }

    // 리뷰 삭제 버튼 클릭
    const deleteClick = async (reviewId) => {
        try {
            const res = await axios.delete(`${apiUrl}/reviews/${reviewId}`, {}, { headers: { 'auth-token': user.token }, withCredentials: true });
            alert("리뷰가 삭제되었습니다.");
            fetchData();
            console.log(res.data);
        } catch (err) {
            alert("리뷰를 삭제하는 데 실패했습니다. 다시 시도해주세요.");
            console.log(err);
        }
    }

    return (
        <div className="writtenreview">
            <table className="writtenreview-table">
                <colgroup>
                    <col style={{ width: '60%' }} />
                    <col style={{ width: '13%' }} />
                    <col style={{ width: '13%' }} />
                    <col style={{ width: '13%' }} />
                </colgroup>
                <tr>
                    <th className='writtenreview-th'>리뷰내용</th>
                    <th className='writtenreview-th'>작성일자</th>
                    <th className='writtenreview-th'>작성자</th>
                    <th className='writtenreview-th'>수정/삭제</th>
                </tr>

                {(!reviewData || reviewData.length <= 0) ? (
                    <tr className="writtenreview-not"><td colSpan="4">작성한 리뷰가 없습니다.</td></tr>
                ) : (
                    reviewData.map((review, index) => (
                        <>
                            <tr className='writtenreview-tr' key={index}>
                                <td colSpan='4'>
                                    <div className='writtenreview-top'>
                                        <div className='writtenreview-top-left'>
                                            <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-image'></img>
                                        </div>
                                        <div className='writtenreview-top-right'>
                                            <p className='writtenreview-title'>{review.product_name}</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr className='writtenreview-tr-2'>
                                <td>
                                    <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                                    <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                                    <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                                    <img src={`${process.env.PUBLIC_URL}/logo192.png`} className='writtenreview-bottom-image'></img>
                                    <p className='writtenreview-rating'>{formatRating(review.rating)}</p>
                                    <p className='writtenreview-contents'>
                                        {review.detail}
                                    </p>
                                </td>
                                <td className='writtenreview-td'>{formatDate(review.create_date)}</td>
                                <td className='writtenreview-td'>{review.user_name}</td>
                                <td className='writtenreview-td'>
                                    <button className='writtenreview-button'>리뷰수정</button>
                                    <button className='writtenreview-button' onClick={() => deleteClick(review.id)}>리뷰삭제</button>
                                </td>
                            </tr>
                        </>
                    ))
                )}

            </table>
        </div>
    );
};

export default WrittenReview;