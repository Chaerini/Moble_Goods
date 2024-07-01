import React, { useState } from 'react';
import './ReviewModal.css';

function ReviewModal({ onClose }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingClick = (index) => {
    setRating(index);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = () => {
    // 리뷰 제출 로직을 여기에 추가하세요.
    console.log({ rating, review });
    onClose();
  };

  return (
    <div className="Wmodal-overlay">
      <div className="Wmodal-content">
        <button className="Wmodal-close-button" onClick={onClose}>X</button>
        <h1>리뷰쓰기</h1>
        <div className="review-Wproduct">
          <img src="path_to_image.png" alt="상품 이미지" />
          <div className="product-info">
            <p>동국제약 센텔리안24 마데카크림 타임리버스</p>
            <p>개수: 타임리버스(시즌7) x 5개 + 사은품[C02]</p>
          </div>
        </div>
        <div className="review-Wrating">
          <p>상품은 만족하셨나요?</p>
          <div className="Wrating-stars">
            {[1, 2, 3, 4, 5].map((index) => (
              <span
                key={index}
                className={index <= rating ? 'star filled' : 'star'}
                onClick={() => handleRatingClick(index)}
              >
                ★
              </span>
            ))}
          </div>
          <p className="Wrating-text">선택하세요.</p>
        </div>
        <div className="Wreview-text">
          <p>어떤 점이 좋았나요?</p>
          <textarea
            placeholder="최소 10자 이상 입력해주세요."
            value={review}
            onChange={handleReviewChange}
          />
          <p className="char-count">{review.length} / 5,000</p>
        </div>
        <div className="wreview-attachment">
          <button className="attachment-button">사진/동영상 첨부하기</button>
          <p className="attachment-note">상품과 무관한 사진/동영상을 첨부한 리뷰는 통보없이 삭제 및 적립 혜택이 회수됩니다.</p>
          <p className="attachment-reward">사진 또는 동영상 첨부시 300원 적립!</p>
        </div>
        <div className="wreview-actions">
          <button className="cancel-button" onClick={onClose}>취소</button>
          <button className="submit-button" onClick={handleSubmit}>등록</button>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
