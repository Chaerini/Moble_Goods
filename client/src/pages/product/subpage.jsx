import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
            option: '기본 옵션',
            price: productDetail.price,
            quantity: 1,
            check: true,
            image: productDetail.productImageUrl,
        });
    };

    if (productId && productDetail) {
        return (
            <>
                <Header />
                <Navbar />
                <div className="product-detail-container">
                    <div className="product-detail-image">
                        {images.map(image => (
                            <img key={image.imageId} src={image.url} alt={productDetail.name} style={{ width: '200px', height: '200px' }} />
                        ))}
                    </div>
                    <div className="product-detail-info">
                        <h2>{productDetail.name}</h2>
                        <p>가격: {productDetail.price}원</p>
                        <p>할인된 가격: {productDetail.discounted_price}원</p>
                        <p>수량: {productDetail.quantity}</p>
                        <p>카테고리: {productDetail.mainCategoryName} / {productDetail.subCategoryName}</p>
                        <p>{productDetail.date}</p>
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

    return (
        <>
            <Header />
            <Navbar />
            <div className="products-container">
                <h1>상품</h1>
                <div className="product-list">
                    {products.map(product => (
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
            </div>
            <Footer />
        </>
    );
};

export default SubPage;
