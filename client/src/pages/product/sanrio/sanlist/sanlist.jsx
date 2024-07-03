import React from 'react';
import Navbar from '../../../../component/navbar/navbar';
import SanrioNavbar from '../../../../component/sanrionavbar/sanrionavbar';
import Header from '../../../../component/header/header';
import Footer from '../../../../component/footer/footer';
import ProductSection from '../productsection/productsection';
import './sanlist.css';

function sanlist() {
  const pomProducts = [
    { id: 1, name: '폼폼푸린 인형', price: '₩25,000', image: '/images/pom1.jpg' },
    { id: 2, name: '폼폼푸린 쿠션', price: '₩30,000', image: '/images/pom2.jpg' },
    { id: 3, name: '폼폼푸린 키링', price: '₩15,000', image: '/images/pom3.jpg' },
    { id: 4, name: '폼폼푸린 머그컵', price: '₩12,000', image: '/images/pom4.jpg' },
  ];
  const cinnaProducts = [
    { id: 1, name: '시나모롤 인형', price: '₩25,000', image: '/images/cinna1.jpg' },
    { id: 2, name: '시나모롤 쿠션', price: '₩30,000', image: '/images/cinna2.jpg' },
    { id: 3, name: '시나모롤 키링', price: '₩15,000', image: '/images/cinna3.jpg' },
    { id: 4, name: '시나모롤 머그컵', price: '₩12,000', image: '/images/cinna4.jpg' },
  ];
  const kuromiProducts = [
    { id: 1, name: '쿠로미 인형', price: '₩25,000', image: '/images/kuro1.jpg' },
    { id: 2, name: '쿠로미 쿠션', price: '₩30,000', image: '/images/kuro2.jpg' },
    { id: 3, name: '쿠로미 키링', price: '₩15,000', image: '/images/kuro3.jpg' },
    { id: 4, name: '쿠로미 머그컵', price: '₩12,000', image: '/images/kuro4.jpg' },
  ];
  const kittyProducts = [
    { id: 1, name: '헬로키티 인형', price: '₩25,000', image: '/images/kitty1.jpg' },
    { id: 2, name: '헬로키티 쿠션', price: '₩30,000', image: '/images/kitty2.jpg' },
    { id: 3, name: '헬로키티 키링', price: '₩15,000', image: '/images/kitty3.jpg' },
    { id: 4, name: '헬로키티 머그컵', price: '₩12,000', image: '/images/kitty4.jpg' },
  ];

  return (
    <>
      <Header />
      <Navbar />
      <SanrioNavbar />
      <div className="sanrio-content">
        <ProductSection id="pompompurin" title="폼폼푸린 상품 목록" products={pomProducts} />
        <ProductSection id="cinnamoroll" title="시나모롤 상품 목록" products={cinnaProducts} />
        <ProductSection id="kuromi" title="쿠로미 상품 목록" products={kuromiProducts} />
        <ProductSection id="hellokitty" title="헬로키티 상품 목록" products={kittyProducts} />
      </div>
      <Footer />
    </>
  );
}

export default sanlist;
