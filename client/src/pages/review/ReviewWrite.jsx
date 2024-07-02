import React, { useState } from 'react';
import './ReviewWrite.css';

function ReviewWrite({ onClose }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');

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

    const handleSubmit = () => {
        // 리뷰 제출 로직을 여기에 추가하세요.
        console.log({ rating, review });
        if (onClose) {
            onClose();
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
                <br />
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
                <br />
                <div className="review-modal-attachment">
                    <button className="review-modal-attachment-button">사진 첨부하기</button>
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
