import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../cart/Cart'; // CartContext를 가져옵니다.
import './Order.css';

function Order() {
  const { cartItems } = useContext(CartContext);
  const [orderer, setOrderer] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [recipient, setRecipient] = useState({
    name: '',
    phone: '',
    address: '',
    message: '',
  });
  const [activeSection, setActiveSection] = useState('shippingInfo');
  const [paymentMethod, setPaymentMethod] = useState('신용카드');
  const navigate = useNavigate();

  const handleToggle = (section) => {
    setActiveSection(section);
  };

  const handleNextClick = () => {
    if (activeSection === 'shippingInfo') {
      setActiveSection('discountShipping');
    } else if (activeSection === 'discountShipping') {
      setActiveSection('paymentMethod');
    }
  };

  const handleOrdererChange = (e) => {
    setOrderer({ ...orderer, [e.target.name]: e.target.value });
  };

  const handleRecipientChange = (e) => {
    setRecipient({ ...recipient, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = () => {
    navigate('/order-complete');
  };

  return (
    <div className="order-container">
      <h1>주문·결제</h1>
      <div className="order-header">
        <div className="step">01. 장바구니</div>
        <div className="step current-step">02. 주문 결제</div>
        <div className="step">03. 주문 완료</div>
      </div>
      <table className="order-items">
        <thead>
          <tr className='order-items-menu'>
            <th>주문 상품 정보</th>
            <th>수량</th>
            <th>상품 금액</th>
            <th>할인 금액</th>
            <th>구매예정가</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr className="order-item" key={item.id}>
              <td className="order-item-info">
                <img src={item.image} alt={item.name} />
                <div className="order-item-details">
                  <span className="order-item-name">{item.name}</span>
                  <span className="order-item-option">옵션: {item.option}</span>
                </div>
              </td>
              <td className="order-item-quantity">
                <div className="quantity-controls">
                  <button>-</button>
                  <span>{item.quantity}</span>
                  <button>+</button>
                </div>
              </td>
              <td className="order-item-price">{item.price}원</td>
              <td className="order-item-discount">0원</td>
              <td className="order-item-total">{item.price * item.quantity}원</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="order-content">
        <div className="order-form-summary">
          <div className="order-form">
            <div className="form-section">
              <div className="form-section-toggle" onClick={() => handleToggle('shippingInfo')}>
                배송 정보
                <span>{activeSection === 'shippingInfo' ? '▲' : '▼'}</span>
              </div>
              <br />
              {activeSection === 'shippingInfo' && (
                <div className="form-section-content">
                  <div className="form-group">
                    <label>주문자</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="이름"
                      value={orderer.name}
                      onChange={handleOrdererChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>연락처</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="연락처"
                      value={orderer.phone}
                      onChange={handleOrdererChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>이메일</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="이메일"
                      value={orderer.email}
                      onChange={handleOrdererChange}
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>받으시는 분</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="받으시는 분"
                      value={recipient.name}
                      onChange={handleRecipientChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>연락처</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="연락처"
                      value={recipient.phone}
                      onChange={handleRecipientChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>주소</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="주소"
                      value={recipient.address}
                      onChange={handleRecipientChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>배송 메시지</label>
                    <input
                      type="text"
                      name="message"
                      placeholder="배송 메시지"
                      value={recipient.message}
                      onChange={handleRecipientChange}
                    />
                  </div>
                  <button className="next-button" onClick={handleNextClick}>다음</button>
                </div>
              )}
            </div>
            <div className="form-section">
              <div className="form-section-toggle" onClick={() => handleToggle('discountShipping')}>
                할인 · 배송비
                <span>{activeSection === 'discountShipping' ? '▲' : '▼'}</span>
              </div>
              <br />
              {activeSection === 'discountShipping' && (
                <div className="form-section-content">
                  <div className="form-group">
                    <label>할인 금액</label>
                    <div className="input-group">
                      <input type="text" value="0원" readOnly />
                      <button className="apply-coupon-button">쿠폰 변경</button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>배송비</label>
                    <div className="input-group">
                      <input type="text" value="3,000원" readOnly />
                      <button className="apply-coupon-button">쿠폰 사용</button>
                    </div>
                  </div>
                  <button className="next-button" onClick={handleNextClick}>다음</button>
                </div>
              )}
            </div>
            <div className="form-section">
              <div className="form-section-toggle" onClick={() => handleToggle('paymentMethod')}>
                결제 수단
                <span>{activeSection === 'paymentMethod' ? '▲' : '▼'}</span>
              </div>
              <br />
              {activeSection === 'paymentMethod' && (
                <div className="form-section-content">
                  <div className="form-group">
                    <label>
                      <input
                        type="radio"
                        value="신용카드"
                        checked={paymentMethod === '신용카드'}
                        onChange={handlePaymentMethodChange}
                      />
                      신용카드
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="radio"
                        value="실시간 계좌이체"
                        checked={paymentMethod === '실시간 계좌이체'}
                        onChange={handlePaymentMethodChange}
                      />
                      실시간 계좌이체
                    </label>
                  </div>
                  <div className="form-group">
                    <label>
                      <input
                        type="radio"
                        value="핸드폰결제"
                        checked={paymentMethod === '핸드폰결제'}
                        onChange={handlePaymentMethodChange}
                      />
                      핸드폰결제
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="order-summary">
            <h3>최종 결제 금액 확인</h3>
            <div className="summary-content">
              <p className="summary-total">합계: {cartItems.reduce((total, item) => total + item.price * item.quantity, 0) + 3000}원</p>
              <br />
              <div className="summary-details">
                <p>상품 금액:</p>
                <p>{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}원</p>
              </div>
              <div className="summary-details">
                <p>할인 금액:</p>
                <p>0원</p>
              </div>
              <div className="summary-details">
                <p>쿠폰 할인 금액:</p>
                <p>0원</p>
              </div>
              <div className="summary-details">
                <p>배송비:</p>
                <p>3,000원</p>
              </div>
              <hr />
              <div className="terms">
                <label><input type="checkbox" /> 전체 선택</label>
                <label><input type="checkbox" /> 개인정보 수집·이용 동의 (필수) <a href="#">약관보기</a></label>
                <label><input type="checkbox" /> 이벤트, 할인쿠폰 등 혜택 제공을 위한 수신 동의 (선택)</label>
              </div>
              <button className="submit-button" onClick={handleSubmit}>결제하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
