import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext'; // CartContext 경로 수정
import { AuthContext } from '../../Context/AuthContext';
import Navbar from '../../component/navbar/navbar';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';
import axios from 'axios';
import OrderComplete from './OrderComplete'; // OrderComplete 모달을 가져옵니다.
import './Order.css';

const apiUrl = process.env.REACT_APP_API_URL;

function Order() {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };
  const { user } = useContext(AuthContext); // UserContext에서 로그인된 유저 정보를 가져옵니다.

  const { cartItems } = useContext(CartContext);
  const [orderer, setOrderer] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [recipient, setRecipient] = useState({
    name: '',
    phone: '',
    address: '',
    message: '',
  });



  const [activeSection, setActiveSection] = useState('shippingInfo');
  const [shippingFee, setShippingFee] = useState(3000); // 배송비 상태 추가
  const [paymentMethod, setPaymentMethod] = useState('신용카드');
  const [allChecked, setAllChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [promoChecked, setPromoChecked] = useState(false);
  const [showOrderComplete, setShowOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setOrderer({
        name: user.name,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  useEffect(() => {
    const totalAmount = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);
    if (totalAmount >= 100000) {
      setShippingFee(0);
    } else {
      setShippingFee(3000);
    }
  }, [selectedItems]);

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

  // 전체 선택 체크박스 핸들러
  const handleAllCheckedChange = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    setPrivacyChecked(checked);
    setPromoChecked(checked);
  };

  // 개별 체크박스 핸들러
  const handlePrivacyCheckedChange = (e) => {
    const checked = e.target.checked;
    setPrivacyChecked(checked);
    if (!checked) {
      setAllChecked(false);
    } else if (promoChecked) {
      setAllChecked(true);
    }
  };

  const handlePromoCheckedChange = (e) => {
    const checked = e.target.checked;
    setPromoChecked(checked);
    if (!checked) {
      setAllChecked(false);
    } else if (privacyChecked) {
      setAllChecked(true);
    }
  };

  const isSubmitEnabled = privacyChecked;

  const handleCopyOrdererInfo = () => {
    setRecipient((prevRecipient) => ({
      ...prevRecipient,
      name: orderer.name,
      phone: orderer.phone,
      address: orderer.address, // 주소 복사
    }));
  };

  const handleSubmit = async () => {
    try {
      // 새로운 상태를 생성하고 그 ID를 받아옴
      const statusResponse = await axios.post(`${apiUrl}/statuses`, { delivery_status: "배송완료" });
      const status_id = statusResponse.data.id;

      const orderData = {
        user_id: user.id,
        total: selectedItems.reduce((total, item) => total + item.price * item.quantity, 0) + shippingFee,
        status_id: status_id, // status_id를 설정
        items: selectedItems.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      console.log('Order data prepared:', orderData);

      // 서버에 주문 데이터 전송
      console.log('Sending order data...');
      const response = await axios.post(`${apiUrl}/orders`, orderData);

      console.log('Order created with ID:', response.data.id);

      setOrderId(response.data.id); // 주문 ID 설정
      setShowOrderComplete(true); // 주문 완료 모달을 표시
    } catch (error) {
      console.error('주문을 완료하는 중 오류가 발생했습니다:', error);
      console.error('오류 응답:', error.response ? error.response.data : '응답 없음');
    }
  };

  const closeOrderCompleteModal = () => {
    setShowOrderComplete(false); // 주문 완료 모달을 닫기
    navigate('/myorder'); // 주문내역 페이지로 이동
  };

  const formatNumber = (num) => {
    return num.toLocaleString('ko-KR');
  };

  return (
    <>
      <Header />
      <Navbar />
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
              <th className='order-items-menu-info'>주문 상품 정보</th>
              <th>수량</th>
              <th>상품 금액</th>
              <th>할인 금액</th>
              <th>구매예정가</th>
            </tr>
          </thead>
          <tbody>
            {selectedItems.map((item) => (
              <tr className="order-item" key={item.id}>
                <td className="order-item-info">
                  <img src={item.url} alt={item.name} />
                  <div className="order-item-details">
                    <span className="order-item-name">상품: {item.name}</span>
                  </div>
                </td>
                <td className="order-item-quantity">
                  <div className="quantity-controls">
                    <span>{item.quantity}</span>
                  </div>
                </td>
                <td className="order-item-price">{formatNumber(item.price)}원</td>
                <td className="order-item-discount">0원</td>
                <td className="order-item-total">{formatNumber(item.price * item.quantity)}원</td>
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
                    <br />
                    <div className="orderer-info-button">
                      <button onClick={handleCopyOrdererInfo}> 주문자 정보와 동일 </button>
                    </div>
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
                        <button className="apply-coupon-button">쿠폰 사용</button>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>배송비</label>
                      <div className="input-group">
                        <input type="text" value={formatNumber(shippingFee) + '원'} readOnly />
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
                <p className="summary-total">합계: {formatNumber(selectedItems.reduce((total, item) => total + item.price * item.quantity, 0) + shippingFee)}원</p>
                <br />
                <div className="summary-details">
                  <p>상품 금액:</p>
                  <p>{formatNumber(selectedItems.reduce((total, item) => total + item.price * item.quantity, 0))}원</p>
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
                  <p>{formatNumber(shippingFee)}원</p>
                </div>
                <hr />
                <div className="terms">
                  <label><input type="checkbox" checked={allChecked} onChange={handleAllCheckedChange} /> 전체 선택</label>
                  <label><input type="checkbox" checked={privacyChecked} onChange={handlePrivacyCheckedChange} /> 개인정보 수집·이용 동의 (필수)</label>
                  <label><input type="checkbox" checked={promoChecked} onChange={handlePromoCheckedChange} /> 이벤트, 할인쿠폰 등 혜택 제공을 위한 수신 동의 (선택)</label>
                </div>
                <button className="order-submit-button" onClick={handleSubmit} disabled={!isSubmitEnabled}>결제하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showOrderComplete && <OrderComplete onClose={closeOrderCompleteModal} selectedItems={selectedItems} />}
    </>
  );
}

export default Order;
