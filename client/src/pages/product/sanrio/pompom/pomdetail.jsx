import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './pomdetail.css';
import Navbar from '../../../../component/navbar/navbar';
import Header from '../../../../component/header/header';
import Footer from '../../../../component/footer/footer';

function PomDetail() {
  const { id } = useParams();
  const product = {
    name: '폼폼푸린 인형',
    options: [
      { size: 'S (35 x 35cm)', price: '₩25,000' },
      { size: 'M (45 x 45cm)', price: '₩30,000' },
    ],
    image: '/images/',
    description: '폼폼푸린 인형의 상세 설명입니다.',
  };

  const [selectedOption, setSelectedOption] = useState(product.options[0]);
  const [quantity, setQuantity] = useState(1);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail">
          <div className="product-image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-options">
              <h3>옵션</h3>
              {product.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${selectedOption.size === option.size ? 'selected' : ''}`}
                  onClick={() => handleOptionChange(option)}
                >
                  {option.size}
                </button>
              ))}
            </div>
            <div className="product-quantity">
              <h3>수량</h3>
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <div className="product-price">
              <span>{selectedOption.size}</span>
              <span>수량: {quantity}</span>
              <span>{selectedOption.price}</span>
              <span>총 금액: {quantity * parseInt(selectedOption.price.replace('₩', '').replace(',', ''))}원</span>
            </div>
            <button className="add-to-cart-button">장바구니 담기</button>
            <div className="product-shipping">
              <p>배송안내: 제작 1~2일 및 택배배송 1~2일 소요</p>
              <p>배송료: 3,000원 (5만원 이상 주문 시 무료)</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PomDetail;
