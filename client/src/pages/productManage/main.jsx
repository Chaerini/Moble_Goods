import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../component/navbar/navbar';
import './main.css';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';

function MainPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <>
            <Header />
            <Navbar />
            <div className="main-container">
                <div className="hero-section">
                    <div className="hero-image">
                            <img src="/images/1.png" alt="Hero" />
                    </div>
                </div>
                <div className="multi-image-banner">
                    <Link to="/category/1" className="circle-link">
                        <img src="/images/sanrio.jpg" alt="산리오" />
                        <p>산리오</p>
                    </Link>
                    <Link to="/category/2" className="circle-link">
                        <img src="/images/disney1.jpg" alt="디즈니" />
                        <p>디즈니</p>
                    </Link>
                    <Link to="/category/3" className="circle-link">
                        <img src="/images/ponyo1.jpg" alt="지브리" />
                        <p>지브리</p>
                    </Link>
                    <Link to="/category/4" className="circle-link">
                        <img src="/images/marvel.jpg" alt="마블" />
                        <p>마블</p>
                    </Link>
                    <Link to="/category/5" className="circle-link">
                        <img src="/images/moble.png" alt="모블" />
                        <p>모블</p>
                    </Link>
                </div>
                <div className="product-banner-section">
                    <div className="product-banner">
                        <img src="/images/kitty1.jpg" alt="Banner 1" />
                        
                    </div>
                    <div className="product-banner">
                        <img src="/images/kitty2.jpg" alt="Banner 2" />
                        
                    </div>
                    <div className="product-banner">
                        <img src="/images/kitty3.jpg" alt="Banner 3" />
                        
                    </div>
                   
                </div>
                <div className="steps-section">
                    <div className="step">
                        <img src="/images/cinna1.jpg" alt="Step 1" />
                        <h3>01. 상품 선택</h3>
                        <p>만들고 싶은 상품을 선택해주세요.</p>
                    </div>
                    <div className="step">
                        <img src="/images/cinna2.jpg" alt="Step 2" />
                        <h3>02. 사진 추가</h3>
                        <p>사진 영역에 원하는 사진을 추가해주세요.</p>
                    </div>
                    <div className="step">
                        <img src="/images/cinna3.jpg" alt="Step 3" />
                        <h3>03. 장바구니 저장</h3>
                        <p>마음껏 편집하고, 장바구니 클릭하면 완성!</p>
                    </div>
                </div>
                <div className="recommend-section">
                    <h2>첫 구매로 가장 많이 선택했어요.</h2>
                    <div className="recommend-products">
                        <div className="recommend-product">
                            <img src="/images/kuro1.jpg" alt="Product 1" />
                            <h3>투명젤리 케이스</h3>
                        </div>
                        <div className="recommend-product">
                            <img src="/images/kuro2.jpg" alt="Product 2" />
                            <h3>증명사진</h3>
                        </div>
                        <div className="recommend-product">
                            <img src="/images/kuro3.jpg" alt="Product 3" />
                            <h3>투명 포토카드</h3>
                        </div>
                        <div className="recommend-product">
                            <img src="/images/kuro4.jpg" alt="Product 4" />
                            <h3>UPGRADE 포토북</h3>
                        </div>
                        <div className="recommend-product">
                            <img src="/images/kitty1.jpg" alt="Product 5" />
                            <h3>씰스티커</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MainPage;
