import express from 'express';
const router = express.Router();
import { 
    createProduct, updateProduct, deleteProduct, getAllProducts, getProductById,
    getProductsByMainCategory , getProductsBySubCategory, getProductsByPrice, getPopularProducts,
    createProductImage, updateProductImage, deleteProductImage, getProductImagesById
} from '../controllers/product.js';

// /products 경로에 핸들러 등록
// 상품 전체 조회
router.get('/', getAllProducts);
// 상품 특정 메인 카테고리 조회
router.get('/main-category/:mainCategoryId', getProductsByMainCategory);
// 상품 특정 서브 카테고리 조회
router.get('/sub-category/:subCategoryId', getProductsBySubCategory);
// 상품 가격순 조회
router.get('/price', getProductsByPrice);
// 상품 인기(판매)순 조회
router.get('/popular', getPopularProducts);
// 특정 상품 조회
router.get('/:id', getProductById);
// 상품 등록
router.post('/', createProduct);
// 상품 수정
router.put('/:id', updateProduct);
// 상품 삭제
router.delete('/:id', deleteProduct);

// 특정 상품 이미지 조회
router.get('/:id/images', getProductImagesById);
// 특정 상품 이미지 추가
router.post('/:id/images', createProductImage);
// 특정 상품 이미지 수정
router.put('/:id/images/:imageId', updateProductImage);
// 특정 상품 이미지 삭제
router.delete('/:id/images/:imageId', deleteProductImage);

export default router;
