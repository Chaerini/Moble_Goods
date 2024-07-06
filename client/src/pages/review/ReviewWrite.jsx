import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReviewWrite.css';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

function ReviewWrite({ onClose }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');
    const [image, setImage] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);  // AuthContext에서 user를 가져옵니다.
    const { product_id, order_id, user_id } = location.state || {};
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (!product_id || !order_id || !user_id) {
            alert('잘못된 접근입니다. 다시 시도해주세요.');
            navigate(-1);  // 이전 페이지로 이동
        }
    }, [product_id, order_id, user_id, navigate]);

    const handleRatingClick = (index) => {
        setRating(index);
    };

    const handleMouseEnter = (index) => {
        setHoverRating(index);
    };

    const handleMouseLeave = () => {
        setHoverRating(0);
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async () => {
        if (review.length < 10) {
            alert('리뷰는 최소 10자 이상이어야 합니다.');
            return;
        }

        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('detail', review);
        formData.append('image', image);
        formData.append('user_id', user_id);
        formData.append('product_id', product_id);
        formData.append('order_id', order_id);

        try {
            await axios.post(`${apiUrl}/reviews`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': user.token
                },
                withCredentials: true
            });
            alert('리뷰가 작성되었습니다.');
            setRating(0);
            setReview('');
            setImage(null);
            if (onClose) {
                onClose();
            }
        } catch (err) {
            console.error(err);
            alert('리뷰 작성에 실패했습니다.');
        }
    };

    return (
        <div className="review-modal-overlay">
            <div className="review-modal-content">
                {onClose && <button className="review-modal-close-button" onClick={onClose}>X</button>}
                <h1>리뷰 작성</h1>
                <div className="review-modal-product">
                    <img src="photo.jpg" alt="상품 이미지" />
                    <div className="review-product-info">
                        <p>포토북</p>
                    </div>
                </div>
                <div className="review-modal-rating">
                    상품은 만족하셨나요?
                    <div className="modal-rating-stars">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <span
                                key={index}
                                className={(index <= (hoverRating || rating)) ? 'star-filled' : 'star'}
                                onClick={() => handleRatingClick(index)}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div className="review-modal-text">
                    <textarea
                        placeholder="최소 10자 이상 입력해주세요."
                        value={review}
                        onChange={handleReviewChange}
                    />
                    <p className="char-count">{review.length} / 5,000</p>
                </div>
                <div className="review-modal-attachment">
                    <input type="file" onChange={handleImageChange} />
                    <p className="review-modal-attachment-note">상품과 무관한 사진을 첨부한 리뷰는 통보없이 삭제됩니다.</p>
                </div>
                <div className="review-modal-actions">
                    <button className="review-modal-cancel-button" onClick={onClose}>취소</button>
                    <button className="review-modal-submit-button" onClick={handleSubmit}>등록</button>
                </div>
            </div>
        </div>
    );
}

export default ReviewWrite;
