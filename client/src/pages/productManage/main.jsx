import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import Navbar from '../../component/navbar/navbar';
import './main.css';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';

function MainPage() {
    const [products, setProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products');
                setProducts(response.data);
                selectRandomProducts(response.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        fetchProducts();
    }, []);

    const selectRandomProducts = (products) => {
        const shuffled = products.sort(() => 0.5 - Math.random());
        setRecommendedProducts(shuffled.slice(0, 4));
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <>
            <Header />
            <Navbar />
            <div className="main-container">
                <div className="hero-section">
                    <Slider {...settings}>
                        <div>
                            <img src="/images/banner11.png" alt="Banner 1" className="hero-image" />
                        </div>
                        <div>
                            <img src="/images/banner2.png" alt="Banner 2" className="hero-image" />
                        </div>
                        <div>
                            <img src="/images/1.png" alt="Banner 3" className="hero-image" />
                        </div>
                    </Slider>
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
                
                
                <div className="recommended-section">
                    <h2>추천 상품</h2>
                    <div className="recommended-products">
                        {recommendedProducts.map((product) => (
                            <div key={product.id} className="recommended-product-card">
                                <Link to={`/category/${product.mainCategoryId}/product/${product.id}`}>
                                    <img src={product.productImageUrl} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>{product.subCategoryName}</p>
                                    <div className="price">{product.price}원</div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="steps-section">
                    <div className="step">
                        <img src="/images/cinna1.jpg" alt="Step 1" />
                        <h3>01. 상품 선택</h3>
                        <p>상품을 선택해주세요.</p>
                    </div>
                    <div className="step">
                        <img src="/images/cinna2.jpg" alt="Step 2" />
                        <h3>02. 장바구니에 추가</h3>
                        <p>장바구니에 원하는 굿즈를 추가해주세요.</p>
                    </div>
                    <div className="step">
                        <img src="/images/cinna3.jpg" alt="Step 3" />
                        <h3>03. 결제</h3>
                        <p>결제만 하면 당일출고 확정!</p>
                    </div>
                </div>

                <div className="recommend-section">
                    <h2>첫 구매로 가장 많이 선택했어요.</h2>
                    <div className="recommend-products">
                        <div className="recommend-product">
                            <img src="/images/kuro1.jpg" alt="Product 1" />
                            <h3>쿠로미 인형</h3>
                        </div>
                        <div className="recommend-product">
                            <img src="/images/kuro2.jpg" alt="Product 2" />
                            <h3>쿠로미 쿠션</h3>
                        </div>
                        <div className="recommend-product">
                            <img src="/images/kuro3.jpg" alt="Product 3" />
                            <h3>쿠로미 키링</h3>
                        </div>
                        <div className="recommend-product">
                            <img src="/images/kuro4.jpg" alt="Product 4" />
                            <h3>쿠로미 머그컵</h3>
                        </div>
                        <div className="recommend-product">
                            <img src="/images/kitty1.jpg" alt="Product 5" />
                            <h3>키티 인형</h3>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MainPage;
