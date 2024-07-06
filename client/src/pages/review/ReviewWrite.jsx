import React, { useState, useEffect, useContext, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ReviewWrite.css';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

function ReviewWrite({ onClose }) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [review, setReview] = useState('');
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { product_id, order_id, user_id } = location.state || {};
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (!product_id || !order_id || !user_id) {
            alert('잘못된 접근입니다. 다시 시도해주세요.');
            navigate(-1);
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
        const selectedImages = Array.from(e.target.files);
        if (selectedImages.length + images.length > 3) {
            alert('최대 3개의 이미지만 업로드할 수 있습니다.');
            return;
        }
        setImages(prevImages => [...prevImages, ...selectedImages]);
    };

    const handleRemoveImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (review.length < 10) {
            alert('리뷰는 최소 10자 이상이어야 합니다.');
            return;
        }

        const reviewData = {
            rating,
            detail: review,
            user_id,
            product_id,
            order_id
        };

        try {
            const reviewResponse = await axios.post(`${apiUrl}/reviews`, reviewData, {
                headers: {
                    'auth-token': user.token
                },
                withCredentials: true
            });

            const reviewId = reviewResponse.data.id;

            const formData = new FormData();
            images.forEach((image, index) => {
                formData.append(`image_${index + 1}`, image);
            });

            await axios.post(`${apiUrl}/review_images/${reviewId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'auth-token': user.token
                },
                withCredentials: true
            });

            alert('리뷰가 작성되었습니다.');
            setRating(0);
            setReview('');
            setImages([]);
            if (onClose) {
                onClose();
            }
        } catch (err) {
            console.error(err);
            alert('리뷰 작성에 실패했습니다.');
        }
    };

    const handleImageUploadClick = () => {
        fileInputRef.current.click();
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
                    <button className="review-modal-attachment-button" onClick={handleImageUploadClick}>사진 첨부하기</button>
                    <input type="file" multiple ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                    <p className="review-modal-attachment-note">상품과 무관한 사진을 첨부한 리뷰는 통보없이 삭제됩니다. (최대 3개)</p>
                    <div className="review-modal-images">
                        {images.map((image, index) => (
                            <div key={index} className="review-image-preview">
                                <img src={URL.createObjectURL(image)} alt={`Review Image ${index + 1}`} />
                                <button onClick={() => handleRemoveImage(index)}>X</button>
                            </div>
                        ))}
                    </div>
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
