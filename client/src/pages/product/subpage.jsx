import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link as ScrollLink, Element } from 'react-scroll';
import './subpage.css';
import Navbar from '../../component/navbar/navbar';
import Header from '../../component/header/header';
import Footer from '../../component/footer/footer';

const SubPage = () => {
    const { categoryId, subCategoryId, productId } = useParams();
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [productDetail, setProductDetail] = useState(null);
    const [images, setImages] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [sortOption, setSortOption] = useState('best'); // 정렬 옵션 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/maincategory');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories", error);
            }
        };

        const fetchSubcategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/maincategory/subcategory');
                setSubcategories(response.data);
            } catch (error) {
                console.error("Error fetching subcategories", error);
            }
        };

        fetchCategories();
        fetchSubcategories();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            const url = subCategoryId 
                ? `http://localhost:8080/api/products?subcategory=${subCategoryId}` 
                : `http://localhost:8080/api/products?category=${categoryId}`;
            try {
                const response = await axios.get(url);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        fetchProducts();
    }, [categoryId, subCategoryId]);

    useEffect(() => {
        if (productId) {
            const fetchProductDetail = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/products/${productId}`);
                    setProductDetail(response.data);
                } catch (error) {
                    console.error('Error fetching product detail', error);
                }
            };

            const fetchProductImages = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/products/${productId}/images`);
                    setImages(response.data);
                } catch (error) {
                    console.error('Error fetching product images', error);
                }
            };

            fetchProductDetail();
            fetchProductImages();
        }
    }, [productId]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const handleAddToCart = () => {
        addToCart({
            id: productDetail.id,
            name: productDetail.name,
            price: productDetail.price * quantity,
            quantity: quantity,
            check: true,
            image: productDetail.productImageUrl,
        });
    };

    const sortProducts = (products, option) => {
        switch (option) {
            case 'best':
                return products.sort((a, b) => b.rating - a.rating); // 예시: rating 기준 정렬
            case 'newest':
                return products.sort((a, b) => new Date(b.date) - new Date(a.date));
            case 'priceLow':
                return products.sort((a, b) => a.price - b.price);
            case 'priceHigh':
                return products.sort((a, b) => b.price - a.price);
            default:
                return products;
        }
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    const sortedProducts = sortProducts(products, sortOption);

    if (productId && productDetail) {
        return (
            <>
                <Header />
                <Navbar />
                <div className="product-detail-container">
                    <div className="product-detail-image">
                        {images.map(image => (
                            <img key={image.imageId} src={image.url} alt={productDetail.name} />
                        ))}
                    </div>
                    <div className="product-detail-info">
                        <h2>{productDetail.name}</h2>
                        <p>가격: {productDetail.price * quantity}원</p>
                        <p>할인된 가격: {productDetail.discounted_price * quantity}원</p>
                        <p>수량: {productDetail.quantity}</p>
                        <p>카테고리: {productDetail.mainCategoryName} / {productDetail.subCategoryName}</p>
                        <p>{productDetail.date}</p>
                        <div className="product-detail-quantity">
                            <label>수량:</label>
                            <input type="number" value={quantity} onChange={handleQuantityChange} min="1" />
                        </div>
                        <button className="add-to-cart-button" onClick={handleAddToCart}>장바구니 담기</button>
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

    // Group products by subcategory
    const groupedProducts = products.reduce((acc, product) => {
        const { subCategoryName } = product;
        if (!acc[subCategoryName]) {
            acc[subCategoryName] = [];
        }
        acc[subCategoryName].push(product);
        return acc;
    }, {});

    return (
        <>
            <Header />
            <Navbar />
            <div className="products-container">
                <div className="sort-options">
                    <select value={sortOption} onChange={handleSortChange}>
                        <option value="best">베스트</option>
                        <option value="newest">신제품</option>
                        <option value="priceLow">낮은 가격순</option>
                        <option value="priceHigh">높은 가격순</option>
                    </select>
                </div>
                <h1>상품</h1>
                <div className="scroll-links">
                    {Object.keys(groupedProducts).map(subCategoryName => (
                        <ScrollLink
                            key={subCategoryName}
                            to={subCategoryName}
                            smooth={true}
                            duration={500}
                            className="scroll-link"
                        >
                            {subCategoryName}
                        </ScrollLink>
                    ))}
                </div>
                {Object.entries(groupedProducts).map(([subCategoryName, subCategoryProducts]) => (
                    <Element name={subCategoryName} key={subCategoryName}>
                        <h2 className="subcategory-title">{subCategoryName}</h2>
                        <hr className="subcategory-divider" />
                        <div className="product-list">
                            {subCategoryProducts.map(product => (
                                <div key={product.id} className="product-card">
                                    <Link to={`/category/${categoryId}${subCategoryId ? `/subcategory/${subCategoryId}` : ''}/product/${product.id}`}>
                                        {product.productImageUrl && (
                                            <img src={product.productImageUrl} alt={product.name} />
                                        )}
                                        <h2>{product.name}</h2>
                                        <p>{product.subCategoryName}</p>
                                        <div className="price">{product.price}원</div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </Element>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default SubPage;
