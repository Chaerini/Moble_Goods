import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../../component/navbar/navbar';
import Header from '../../../../component/header/header';
import Footer from '../../../../component/footer/footer';
import './sandetail.css';

const productsData = {
  pompompurin: [
    { id: 1, name: '폼폼푸린 인형', price: '₩25,000', image: '/images/pom1.jpeg', description: '귀여운 폼폼푸린 인형입니다.' },
    { id: 2, name: '폼폼푸린 쿠션', price: '₩30,000', image: '/images/pom2.jpg', description: '푹신한 폼폼푸린 쿠션입니다.' },
    { id: 3, name: '폼폼푸린 키링', price: '₩15,000', image: '/images/pom3.jpg', description: '폼폼푸린 키링입니다.' },
    { id: 4, name: '폼폼푸린 머그컵', price: '₩12,000', image: '/images/pom4.jpg', description: '폼폼푸린 머그컵입니다.' },
  ],
  cinnamoroll: [
    { id: 1, name: '시나모롤 인형', price: '₩25,000', image: '/images/cinna1.jpg', description: '귀여운 시나모롤 인형입니다.' },
    { id: 2, name: '시나모롤 쿠션', price: '₩30,000', image: '/images/cinna2.jpg', description: '푹신한 시나모롤 쿠션입니다.' },
    { id: 3, name: '시나모롤 키링', price: '₩15,000', image: '/images/cinna3.jpg', description: '시나모롤 키링입니다.' },
    { id: 4, name: '시나모롤 머그컵', price: '₩12,000', image: '/images/cinna4.jpg', description: '시나모롤 머그컵입니다.' },
  ],
  kuromi: [
    { id: 1, name: '쿠로미 인형', price: '₩25,000', image: '/images/kuro1.jpg', description: '귀여운 쿠로미 인형입니다.' },
    { id: 2, name: '쿠로미 쿠션', price: '₩30,000', image: '/images/kuro2.jpg', description: '푹신한 쿠로미 쿠션입니다.' },
    { id: 3, name: '쿠로미 키링', price: '₩15,000', image: '/images/kuro3.jpg', description: '쿠로미 키링입니다.' },
    { id: 4, name: '쿠로미 머그컵', price: '₩12,000', image: '/images/kuro4.jpg', description: '쿠로미 머그컵입니다.' },
  ],
  hellokitty: [
    { id: 1, name: '헬로키티 인형', price: '₩25,000', image: '/images/kitty1.jpg', description: '귀여운 헬로키티 인형입니다.' },
    { id: 2, name: '헬로키티 쿠션', price: '₩30,000', image: '/images/kitty2.jpg', description: '푹신한 헬로키티 쿠션입니다.' },
    { id: 3, name: '헬로키티 키링', price: '₩15,000', image: '/images/kitty3.jpg', description: '헬로키티 키링입니다.' },
    { id: 4, name: '헬로키티 머그컵', price: '₩12,000', image: '/images/kitty4.jpg', description: '헬로키티 머그컵입니다.' },
  ],
};

function SanDetail() {
  const { category, id } = useParams();
  const categoryData = productsData[category];

  if (!categoryData) {
    return (
      <>
        <Header />
        <Navbar />
        <div className="product-detail-container">
          <h2>존재하지 않는 카테고리입니다.</h2>
        </div>
        <Footer />
      </>
    );
  }

  const product = categoryData.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <>
        <Header />
        <Navbar />
        <div className="product-detail-container">
          <h2>존재하지 않는 상품입니다.</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="product-detail-price">{product.price}</p>
          <div className="product-detail-options">
            <label>옵션:</label>
            <select>
              <option value="S">S (35 x 35cm)</option>
              <option value="M">M (45 x 45cm)</option>
            </select>
          </div>
          <div className="product-detail-quantity">
            <label>수량:</label>
            <input type="number" defaultValue="1" min="1" />
          </div>
          <button className="add-to-cart-button">장바구니 담기</button>
          <div className="product-detail-shipping">
            <p>배송안내: 제작 1~2일 및 택배배송 1~2일 소요</p>
            <p>배송료: 3,000원 (5만원 이상 주문 시 무료)</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SanDetail;
