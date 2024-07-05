import express from 'express';
import { 
    createProduct, updateProduct, deleteProduct, getAllProducts, getProductById,
    getProductsByMainCategory, getProductsBySubCategory, getProductsByPrice, getPopularProducts,
    createProductImage, updateProductImage, deleteProductImage, getProductImagesById
} from '../controllers/product.js';

const router = express.Router();

// 상품 관련 라우트
router.get('/', getAllProducts);  // 전체 상품 조회 또는 카테고리별 조회
router.get('/:id', getProductById);  // 특정 상품 조회
router.post('/', createProduct);  // 상품 등록
router.put('/:id', updateProduct);  // 상품 수정
router.delete('/:id', deleteProduct);  // 상품 삭제

router.get('/main-category/:mainCategoryId', getProductsByMainCategory);  // 특정 메인 카테고리 상품 조회
router.get('/sub-category/:subCategoryId', getProductsBySubCategory);  // 특정 서브 카테고리 상품 조회
router.get('/price', getProductsByPrice);  // 가격순 상품 조회
router.get('/popular', getPopularProducts);  // 인기 상품 조회

// 이미지 관련 라우트
router.get('/:id/images', getProductImagesById);  // 특정 상품 이미지 조회
router.post('/images', createProductImage);  // 이미지 등록
router.put('/:id/images/:imageId', updateProductImage);  // 이미지 수정
router.delete('/:id/images/:imageId', deleteProductImage);  // 이미지 삭제

export default router;
